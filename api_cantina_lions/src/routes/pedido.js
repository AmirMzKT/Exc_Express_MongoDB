import express from "express";
import Pedido from "../models/pedido.js";

const router = express.Router();

// POST
router.post("/", async (req, res) => {
    try {
        const { nomeCliente, item, quantidade, formaPagamento, observacao } = req.body;

        let valorUnitario = 0;
        let valorTotal = 0;

        /*
        Regras:
        1. Definição do Valor Unitário: Antes de salvar no banco, o backend deve preencher
        valorUnitario seguindo esta tabela:
        Salgado : R$ 8
        Suco : R$ 6
        Combo : R$ 12
        Bolo : R$ 5
        2. Cálculo do Valor Total: Multiplique valorUnitario por quantidade .
        3. Desconto por Quantidade: Se a quantidade for maior ou igual a 5, aplique 10% de desconto
        sobre o valor total.
        4. Retorno: Salve o pedido no banco e retorne o documento criado com status 201 .
        */

        if (item === "Salgado") {
            valorUnitario = 8;
            valorTotal = valorUnitario * quantidade;
            if (quantidade > 5) {
                valorTotal * 0.90;
            }
        } else if (item === "Suco") {
            valorUnitario = 6;
            valorTotal = valorUnitario * quantidade;
            if (quantidade > 5) {
                valorTotal * 0.90;
            }
        } else if (item === "Combo") {
            valorUnitario = 12;
            valorTotal = valorUnitario * quantidade;
            if (quantidade > 5) {
                valorTotal * 0.90;
            }
        } else if (item === "Bolo") {
            valorUnitario = 5;
            valorTotal = valorUnitario * quantidade;
            if (quantidade > 5) {
                valorTotal * 0.90;
            }
        };

        const novoPedido = new Pedido({
            nomeCliente,
            item,
            quantidade,
            formaPagamento,
            observacao,
            valorUnitario,
            valorTotal
        });

        await novoPedido.save();

        res.status(201).json(novoPedido);
    } catch (error) {
        res.status(400).json({ message: "Erro ao criar pedido.", error: error.message });
    }
});

// GET
router.get("/", async (req, res) => {
    try {
        const pedidos = await Pedido.find();
        res.status(200).json({ message: "Lista de pedidos:", pedidos });
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar pedidos.", error: error.message });
    }
});

// GET - Por cliente
router.get("/busca", async (req, res) => {
    try {
        const { cliente } = req.query;
        let filtro = {};

        if (cliente) {
            filtro.nomeCliente = { $regex: cliente, $options: "i"};
        }

        const pedidos = await Pedido.find(filtro);
        res.status(200).json(pedidos);
    } catch (error) {
        res.status(500).json({ message: "Erro ao executar busca.", error: error.message });
    }
});

// PATCH - Status
router.patch("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const pedidoAtualizado = await Pedido.findByIdAndUpdate(
            id,
            { status },
            { new: true, runValidators: true}
        );

        if (!pedidoAtualizado) {
            return res.status(404).json({ message: "Pedido não encontrado." });
        }

        res.status(200).json(pedidoAtualizado);
    } catch (error) {
        res.status(400).json({ message: "Erro ao atualizar status do pedido.", error: error.message });
    }
});

// DELETE
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const pedidoRemovido = await Pedido.findByIdAndDelete(id);

        if (!pedidoRemovido) {
            return res.status(404).json({ message: "Pedido não encontrado."})
        }

        res.status(200).json({ message: "Pedido removido com sucesso." })
    } catch (error) {
        res.status(500).json({ message: "Erro ao remover pedido.", error: error.message });
    }
});

export default router;