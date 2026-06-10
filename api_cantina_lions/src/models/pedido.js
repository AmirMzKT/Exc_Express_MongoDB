import mongoose from "mongoose";

const pedidoSchema = new mongoose.Schema(
    {
        nomeCliente: {
            type: String,
            required: [true, "O nome do cliente é obrigatório."]
        },
        item: {
            type: String,
            required: [true, "Informe o item do pedido."],
            enum: {
                values: ["Salgado", "Suco", "Combo", "Bolo"],
                message: "Item inválido. Menu: Salgado, Suco, Combo, Bolo."
            }
        },
        quantidade: {
            type: Number,
            required: [true, "Informe a quantidade."]
        },
        formaPagamento: {
            type: String,
            required: [true, "Informe a forma de pagamento."],
            enum: {
                values: ["Dinheiro", "Pix", "Cartão"],
                message: "Forma de pagamento inválido! Apenas Dinheiro, Pix ou Cartão."
            }
        },
        observacao: {
            type: String
        },
        valorUnitario: {
            type: Number
        },
        valorTotal: {
            type: Number
        },
        status: {
            type: String,
            default: "Pendente",
            enum: {
                values: ["Pendente", "Pago", "Entregue"],
                message: "Status inválido! Informe apenas Pendente, Pago ou Entregue."
            }
        }
    }
);

const Pedido = mongoose.model("Pedido", pedidoSchema);
export default Pedido

/*
Exemplo
nomeCliente : Tipo String , obrigatório.
item : Tipo String , obrigatório (deve aceitar apenas: Salgado , Suco , Combo ou Bolo ).
quantidade : Tipo Number , obrigatório.
formaPagamento : Tipo String , obrigatório (deve aceitar apenas: Dinheiro , Pix ou
Cartão ).
observacao : Tipo String , opcional.
valorUnitario : Tipo Number (será calculado automaticamente pela API).
valorTotal : Tipo Number (será calculado automaticamente pela API).
status : Tipo String , com valor padrão de "Pendente" (deve aceitar apenas: Pendente ,
Pago ou Entregue ).
*/