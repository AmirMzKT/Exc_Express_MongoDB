import mongoose, { mongo } from "mongoose";

const hospedeSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: [true, "O nome do hóspede é obrigatório."]
    },
    idade: {
        type: Number,
        required: [true, "A idade do hóspede é obrigatória."]
    }
});

const reservaSchema = new mongoose.Schema(
    {
        imovelId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Imovel",
            required: [true, "Informe o ID do imóvel."]
        },
        nomeHospede: {
            type: String,
            required: [true, "Informe o nome do hóspede."]
        },
        emailHospede: {
            type: String,
            required: [true, "Informe o email do hóspede."]
        },
        dataEntrada: {
            type: Date,
            required: [true, "Informe a data de entrada.",]
        },
        dataSaida: {
            type: Date,
            required: [true, "Informe a data de saida.",]
        },
        hospedes: {
            type: [hospedeSchema],
            required: [true, "A lista de hóspedes é obrigatória."]
        },
        cupomDesconto: {
            type: String
        },
        valorTotal: {
            type: Number
        },
        status: {
            type: String,
            default: "Pendente",
            enum: {
                values: ["Pendente", "Confirmada", "Cancelada"],
                message: "Status inválido."
            }
        }
    }
);

const Reserva = mongoose.model("Reserva", reservaSchema);
export default Reserva;


/*
Exemplo
imovelId : Tipo mongoose.Schema.Types.ObjectId com referência ( ref ) ao modelo
Imovel , obrigatório.
nomeHospede : Tipo String , obrigatório.
emailHospede : Tipo String , obrigatório.
dataEntrada (Check-in): Tipo Date , obrigatória.
dataSaida (Check-out): Tipo Date , obrigatória.
hospedes : Array de Objetos, obrigatório, onde cada objeto deve conter:
nome : Tipo String
idade : Tipo Number
cupomDesconto : Tipo String , opcional.
valorTotal : Tipo Number (calculado automaticamente pela API).
status : Tipo String , padrão "Pendente" (deve aceitar apenas: Pendente ,
Confirmada ou Cancelada ).
*/