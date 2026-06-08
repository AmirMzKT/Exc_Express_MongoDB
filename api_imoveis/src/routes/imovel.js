import express from "express";
import Imovel from "../models/imovel.js";

const router = express.Router();

// POST
router.post("/", async (req, res) => {
    try {
        const { titulo, descricao, localizacao, precoNoite, capacidadeMaxima } = req.body;
        const novoImovel = new Imovel({
            titulo,
            descricao,
            localizacao,
            precoNoite,
            capacidadeMaxima
        });

        await novoImovel.save();

        res.status(201).json(novoImovel);
    } catch (error) {
        res.status(400).json({ message: "Erro ao cadastrar imóvel.", error: error.message });
    }
});

// GET
router.get("/", async (req, res) => {
    try {
        const imoveis = await Imovel.find();
        res.status(200).json(imoveis);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar os imóveis.", error: error.message });
    }
});

// GET - Por localização
router.get("/busca", async (req, res) => {
    try {
        const { buscaLocalizacao } = req.query;
        let filtro = {};

        if (buscaLocalizacao) {
            filtro.localizacao = { $regex: buscaLocalizacao, $options: "i" };
        };

        const imoveis = await Imovel.find(filtro);
        res.status(200).json(imoveis);
    } catch (error) {
        res.status(500).json({ message: "Erro ao executar a busca.", error: error.message });
    }
});

export default router;