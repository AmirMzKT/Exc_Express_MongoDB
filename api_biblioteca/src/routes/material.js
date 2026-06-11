import express from "express";
import Material from "../models/material.js";

const router = express.Router();

// POST
router.post("/", async (req, res) => {
    try {
        const { titulo, tipo, autor, estoque } = req.body;

        const novoMaterial = new Material({
            titulo,
            tipo,
            autor,
            estoque
        });

        await novoMaterial.save();

        res.status(201).json(novoMaterial);
    } catch (error) {
        res.status(400).json({ message: "Erro ao cadastrar material.", error: error.message });
    }
});

// GET
router.get("/", async (req, res) => {
    try {
        const materiais = await Material.find();
        res.status(200).json(materiais);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar materiais.", error: error.message });
    }
});

// GET - Por estoque
router.get("/busca", async (req, res) => {
    try {
        const { disponivel } = req.query;
        let filtro = {};

        if (disponivel) {
            filtro.mat
        }
    } catch (error) {
        
    }
})