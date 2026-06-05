import express from "express";
import Agendamento from "../models/agendamento.js";

const router = express.Router();

// POST
router.post("/", async (req, res) => {
    try {
        const { nomePet, especie, nomeDono, telefoneDono, servico, data } = req.body;

        let valor = 0;

        /*
        Regras:
        Se for Cão : Banho (R$ 50) | Tosa (R$ 60) | Banho e Tosa (R$ 100)
        Se for Gato : Banho (R$ 60) | Tosa (R$ 70) | Banho e Tosa (R$ 110)
        Se for Outro : Banho (R$ 40) | Tosa (R$ 50) | Banho e Tosa (R$ 80)
        */

        if (especie === "Cão") {
            if (servico === "Banho") {
             valor = 50;   
            } else if (servico === "Tosa") {
                valor = 60;
            } else if (servico === "Banho e Tosa") {
                valor = 100;
            }
        } else if (especie === "Gato") {
            if (servico === "Banho") {
             valor = 60;   
            } else if (servico === "Tosa") {
                valor = 70;
            } else if (servico === "Banho e Tosa") {
                valor = 110;
            }
        } else if (especie === "Outro") {
            if (servico === "Banho") {
             valor = 40;   
            } else if (servico === "Tosa") {
                valor = 50;
            } else if (servico === "Banho e Tosa") {
                valor = 80;
            }
        }

        const novoAgendamento =  new Agendamento({
            nomePet,
            especie,
            nomeDono,
            telefoneDono,
            servico,
            data,
            valor
        });

        await novoAgendamento.save();

        res.status(201).json(novoAgendamento);
    } catch (error) {
        res.status(400).json({ message: "Erro ao criar agendamento", error: error.message });
    }
});

// GET
router.get("/", async (req, res) => {
    try {
        const agendamentos = await Agendamento.find();
        res.status(200).json(agendamentos);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar agendamentos.", error: error.message });
    }
});

// GET - Por nome
router.get("/busca", async (req, res) => {
    try {
        const { nome } = req.query;
        let filtro = {};

        if (nome) {
            filtro.nomePet = { $regex: nome, $options: "i" };
        }

        const agendamentos = await Agendamento.find(filtro);
        res.status(200).json(agendamentos);
    } catch (error) {
        res.status(500).json({ message: "Erro ao executar a busca", error: error.message });
    }
});

// PATCH
router.patch("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const agendamentoAtualizado = await Agendamento.findByIdAndUpdate(
            id,
            { status },
            { new: true, runValidators: true }
        );

        if (!agendamentoAtualizado) {
            return res.status(404).json({ message: "Agendamento não encontrado." });
        }

        res.status(200).json(agendamentoAtualizado);
    } catch (error) {
        res.status(400).json({ message: "Erro ao atualizar status.", error: error.message });
    }
});

// DELETE
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const agendamentoDeletado = await Agendamento.findByIdAndDelete(id);

        if (!agendamentoDeletado) {
            return res.status(404).json({ message: "Agendamento não encontrado." });
        }

        res.status(200).json({ message: "Agendamento deletado com sucesso." });
    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar agendamento.", error: error.message });
    }
});

export default router;