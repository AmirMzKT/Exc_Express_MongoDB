import express from "express";
import Reserva from "../models/reserva.js";
import Imovel from "../models/imovel.js";

const router = express.Router();

// POST
router.post("/", async (req, res) => {
    try {
        const { imovelId, nomeHospede, emailHospede, dataEntrada, dataSaida, hospedes, cupomDesconto } = req.body;

        // Validação de Existência
        const imovel = await Imovel.findById(imovelId);
        if (!imovel) {
            return res.status(404).json({ message: "Imóvel não encontrado." });
        }

        // Validação de Capacidade
        const totalHospedes = hospedes.length
        if (totalHospedes > imovel.capacidadeMaxima) {
            return res.status(400).json({ message: `A quantidade de hóspedes (${totalHospedes}) excede a capacidade máxima permitida (${imovel.capacidadeMaxima}).` })
        }

        // Cálculo de Diárias por Dia da Semana
        let dataAtual = new Date(dataEntrada);
        const dataFinal = new Date(dataSaida);

        let noites = 0;
        let somarDiariaBase = 0;

        while (dataAtual < dataFinal) {
            const diaSemana = dataAtual.getDay();

            let precoDaNoite = imovel.precoNoite;

            if (diaSemana === 5 || diaSemana === 6 || diaSemana === 0) {
              precoDaNoite = precoDaNoite + (precoDaNoite * 0.20);  
            }

            somarDiariaBase = somarDiariaBase + precoDaNoite;
            dataAtual.setDate(dataAtual.getDate() + 1);

            noites++;
        }

        // Taxa de Hóspede Adicional por Idade
        let taxaHospedeAdicionaisPorNoite = 0;
        if (totalHospedes > 2) {
            const adicionais = hospedes.slice(2);
            adicionais.forEach((hospede) => {
                if (hospede.idade >= 12) {
                    taxaHospedeAdicionaisPorNoite = taxaHospedeAdicionaisPorNoite + 50;
                } else {
                    taxaHospedeAdicionaisPorNoite = taxaHospedeAdicionaisPorNoite + 25;
                }
            });
        }

        const totalTaxasAdicionais = taxaHospedeAdicionaisPorNoite * noites;
        let subtotal = somarDiariaBase + totalTaxasAdicionais
        if (noites >= 5) {
            subtotal = subtotal - (subtotal * 0.10);
        }

        // Cupom de Desconto (Cupom: LIONS10 = 10% de desconto)
        if (cupomDesconto === "LIONS10") {
            subtotal = subtotal - (subtotal * 0.10);
        }

        const novaReserva = new Reserva({
            imovelId,
            nomeHospede,
            emailHospede,
            dataEntrada,
            dataSaida,
            hospedes,
            cupomDesconto,
            valorTotal: subtotal
        });

        await novaReserva.save();
        res.status(201).json(novaReserva);
    } catch (error) {
        res.status(400).json({ message: "Erro ao criar reserva.", error: error.message });
    }
});

// GET
router.get("/", async (req, res) => {
    try {
        const reservas = await Reserva.find().populate("imovelId");
        res.status(200).json(reservas);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar reservas.", error: error.message });
    }
});

// PATCH - Status da Reserva
router.patch("/:id/status", async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const reservaAtualizada = await Reserva.findByIdAndUpdate(
            id,
            { status },
            { new: true, runValidators: true }
        );

        if (!reservaAtualizada) {
            return res.status(404).json({ message: "Reserva não encontrada." })
        }

        res.status(200).json(reservaAtualizada)
    } catch (error) {
        res.status(400).json({ message: "Erro ao atualizar status.", error: error.message });
    }
});

// GET - Relatório Financeiro e Estatísticas
router.get("/relatorio", async (req, res) => {
    try {
        const reservasConfirmadas = await Reserva.find({ status: "Confirmada "});

        let faturamentoTotal = 0;
        let totalNoites = 0;
        let somaHospedes = 0;

        reservasConfirmadas.forEach((reserva) => {
            faturamentoTotal = faturamentoTotal + reserva.valorTotal;
            somaHospedes = somaHospedes + reserva.hospedes.length;

            const noitesReserva = Math.ceil(diferencaTempo / (1000 * 60 * 60 * 24));

            totalNoites = totalNoites + noitesReserva
        });

        let mediaHospedes = 0;
        if (reservasConfirmadas.length > 0) {
            mediaHospedes = somaHospedes / reservasConfirmadas.length;
        }

        res.status(200).json({
            faturamentoTotal,
            totalNoites,
            mediaHospedes
        });
    } catch (error) {
        res.status(500).json({ message: "Erro ao gerar relatório", error: error.message });
    }
});

export default router;