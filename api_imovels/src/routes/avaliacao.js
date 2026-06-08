import express from "express";
import Avaliacao from "../models/avaliacao.js";
import Imovel from "../models/imovel.js";
import Reserva from "../models/reserva.js";

const router = express.Router();

// POST
router.post("/", async (req, res) => {
    try {
        const { imovelId, nomeUsuario, nota, comentario } = req.body;

        const imovel = await Imovel.findById(imovelId);
        if (!imovel) {
            return res.status(404).json({ message: "Imóvel não encontrado." });
        }

        const reservaConfirmada = await Reserva.findOne({
            imovelId: imovelId,
            nomeHospede: nomeUsuario,
            status: "Confirmada"
        });

        if (!reservaConfirmada) {
            return res.status(400).json({ message: "Apenas hóspedes com reservas confirmadas para este imóvel podem avaliar. "});
        }

        const novaAvaliacao = new Avaliacao({
            imovelId,
            nomeUsuario,
            nota,
            comentario
        });

        await novaAvaliacao.save();
        res.status(201).json(novaAvaliacao);
    } catch (error) {
        res.status(400).json({ message: "Erro ao criar avaliação.", error: error.message });
    }
});

// GET - Avaliação por Imóvel
router.get("/imovel/:id", async (req, res) => {
    try {
        const { imovelId } = req.params;
        const avaliacoes = await Avaliacao.find({ imovelId });

        let somaNotas = 0;

        avaliacoes.forEach((avaliacao) => {
            somaNotas = somaNotas + avaliacao.nota;
        });

        let mediaGeral = 0;

        if (avaliacoes.length > 0) {
            mediaGeral = somaNotas / avaliacoes.length
        }

        res.status(200).json({
            avaliacoes,
            mediaGeral
        });
    } catch (error) {
        res.status(500).json({ message: "Erro ao carregar avaliações", error: error.message });
    }
});

// DELETE
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { nomeUsuario } = req.body;
        
        const avaliacao = await Avaliacao.findById(id);
        if (!avaliacao) {
            return res.status(404).json({ message: "Avaliação não encontrada." });
        }

        // Regra de segurança
        if (avaliacao.nomeUsuario !== nomeUsuario) {
            return res.status(403).json({ message: "Você não possui permissão para deletar a avaliação de outro usuário. "});
        }

        await Avaliacao.findByIdAndDelete(id);
        res.status(200).json({ message: "Avaliação removida." });
    } catch (error) {
        res.status(500).json({ message: "Erro ao remover avaliação.", error: error.message });
    }
});

export default router;