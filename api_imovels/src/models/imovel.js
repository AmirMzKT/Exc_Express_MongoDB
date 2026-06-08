import mongoose from "mongoose";

const imovelSchema = new mongoose.Schema(
    {
        titulo: {
            type: String,
            required: [true, "O título é obrigatório."]
        },
        descricao: {
            type: String,
            required: [true, "A descrição é obrigatória."]
        },
        localizacao: {
            type: String,
            required: [true, "A localização é obrigatória (Ex: Ubatuba - SP)."],
        },
        precoNoite: {
            type: Number,
            required: [true, "Informe o preço."]
        },
        capacidadeMaxima: {
            type: Number,
            required: [true, "Informe a capacidade máxima."]
        },
        disponivel: {
            type: Boolean,
            default: true
        }
    }
);

const Imovel = mongoose.model("Imóvel", imovelSchema);
export default Imovel;


/*
Exemplo
titulo : Tipo String , obrigatório.
descricao : Tipo String , obrigatório.
localizacao : Tipo String , obrigatório (ex: "Ubatuba - SP" ).
precoNoite : Tipo Number , obrigatório (valor base da diária).
capacidadeMaxima : Tipo Number , obrigatório.
disponivel : Tipo Boolean , com valor padrão true .
*/


/*

*/