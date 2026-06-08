import mongoose from "mongoose";

const avaliacaoSchema = new mongoose.Schema(
    {
        imovelId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Imovel",
            required: [true, "Informe o ID do imóvel"]
        },
        nomeUsuario: {
            type: String,
            required: [true, "O nome do usuário é obrigatório."]
        },
        nota: {
            type: Number,
            required: [true, "A nota de avaliação é obrigatório."],
            min: [1, "A nota mínima é 1."],
            max: [5, "A nota máxima é 5."]
        },
        comentario: {
            type: String,
            required: [true, "O comentário é obrigatório."],
            minlength: [10, "O comentário deve ter no mínimo 10 caracteres."]
        },
        dataCriacao: {
            type: Date,
            default: Date.now
        }
    }
);

const Avaliacao = mongoose.model("Avaliação", avaliacaoSchema);
export default Avaliacao;

/*
Exemplo
imovelId : Tipo mongoose.Schema.Types.ObjectId com referência ( ref ) ao modelo
Imovel , obrigatório.
nomeUsuario : Tipo String , obrigatório.
nota : Tipo Number , obrigatório (deve aceitar apenas valores de 1 a 5 ).
comentario : Tipo String , obrigatório (mínimo de 10 caracteres).
dataCriacao : Tipo Date , padrão Date.now .
*/