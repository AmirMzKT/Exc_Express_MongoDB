import mongoose from "mongoose";

const materialSchema = new mongoose.Schema(
    {
        titulo: {
            type: String,
            required: [true, "O título é obrigatório."]
        },
        tipo: {
            type: String,
            required: [true, "Informe o tipo do material."],
            enum: {
                values: ["Livro", "Revista", "Apostila"],
                message: "Tipo inválido. Apenas Livro, Revista ou Apostila."
            }
        },
        autor: {
            type: String,
            required: [true, "Informe o nome do autor."]
        },
        estoque: {
            type: Number,
            required: [true, "Informe a quantidade no estoque."]
        }
    }
);

const Material = mongoose.model("Material", materialSchema);
export default Material;