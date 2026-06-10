import express from "express";
import Matricula from "../models/matricula.js";

const router = express.Router();

// POST
router.post("/", async (req, res) => {
    try {
        const { nomeAluno, idade, modalidade, plano, dataMatricula } = req.body;

        let valorMensal = 0;
        let valorTotal = 0;

        /*
        Regras:
        1. Definição do Valor Mensal: Antes de salvar no banco, o backend deve preencher valorMensal seguindo esta tabela:
        Musculação : R$ 90
        Funcional : R$ 120
        Dança : R$ 100
        2. Cálculo do Valor Total:
        Plano Mensal : 1 mensalidade.
        Plano Trimestral : 3 mensalidades com 10% de desconto.
        Plano Semestral : 6 mensalidades com 15% de desconto.
        */

        if (modalidade === "Musculação") {
            if (plano === "Mensal") {
                valorMensal = 90;
                valorTotal = valorMensal // 1 mensalidade   
            } else if (plano === "Trimestral") {
                valorMensal = 90 * 3;
                valorTotal = valorMensal * 0.90; // 3 mensalidades + 10% de desconto
            } else if (plano === "Semestral") {
                valorMensal = 90 * 6;
                valorTotal = valorMensal * 0.85; // 6 mensalidades + 15% de desconto
            }
        } else if (modalidade === "Funcional") {
            if (plano === "Mensal") {
                valorMensal = 120;
                valorTotal = valorMensal; // 1 mensalidade   
            } else if (plano === "Trimestral") {
                valorMensal = 120 * 3;
                valorTotal = valorMensal * 0.90; // 3 mensalidades + 10% de desconto
            } else if (plano === "Semestral") {
                valorMensal = 120 * 6;
                valorTotal = valorMensal * 0.85; // 6 mensalidades + 15% de desconto
            }
        } else if (modalidade === "Dança") {
            if (plano === "Mensal") {
                valorMensal = 100;
                valorTotal = valorMensal; // 1 mensalidade   
            } else if (plano === "Trimestral") {
                valorMensal = 100 * 3;
                valorTotal = valorMensal * 0.90; // 3 mensalidades + 10% de desconto
            } else if (plano === "Semestral") {
                valorMensal = 100 * 6;
                valorTotal = valorMensal * 0.85; // 6 mensalidades + 15% de desconto
            }
        };

        const novaMatricula = new Matricula({
            nomeAluno,
            idade,
            modalidade,
            plano,
            dataMatricula,
            valorMensal,
            valorTotal
        });

        await novaMatricula.save();

        res.status(201).json(novaMatricula);
    } catch (error) {
        res.status(400).json({ message: "Erro ao cadastrar matrícula do aluno.", error: error.message });
    }
});

// GET
router.get("/", async (req, res) => {
    try {
        const matriculas = await Matricula.find();
        res.status(200).json({ message: "Lista de matrículas:", matriculas });
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar as matrículas.", error: error.message });
    }
});

// GET - Por modalidade
router.get("/busca", async (req, res) => {
    try {
        const { modalidade } = req.query;
        let filtro = {};

        if (modalidade) {
            filtro.modalidade = { $regex: modalidade, $options: "i" };
        }

        const matriculas = await Matricula.find(filtro);
        res.status(200).json(matriculas);
    } catch (error) {
        res.status(500).json({ message: "Erro ao executar busca.", error: error.message });
    }
});

// PATCH - Status
router.patch("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const matriculaAtualizada = await Matricula.findByIdAndUpdate(
            id,
            { status },
            { new: true, runValidators: true }
        );

        if (!matriculaAtualizada) {
            return res.status(404).json({ message: "Matrícula não encontrada."});
        }

        res.status(200).json(matriculaAtualizada);
    } catch (error) {
        res.status(400).json({ message: "Erro ao atualizar matrícula.", error: error.message });
    }
});

//DELETE
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const matriculaDeletada = await Matricula.findByIdAndDelete(id);

        if (!matriculaDeletada) {
            return res.status(404).json({ message: "Matrícula não encontrada." })
        }

        res.status(200).json({ message: "Matrícula removida com sucesso." });
    } catch (error) {
        res.status(500).json({ message: "Erro ao remover matrícula.", error: error.message });
    }
});

export default router;