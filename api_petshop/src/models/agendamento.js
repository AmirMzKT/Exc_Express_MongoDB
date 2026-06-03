import mongoose from "mongoose";

const agendamentoSchema = new mongoose.Schema(
    {
        nomePet: {
            type: String,
            required: [true, "O nome é obrigatório."],
            trim: true,
        }
    }
)

/*
Exemplo

{
"nomePet": "Frederico",
"especie": "Cão",
"nomeDono": "Ana Paula",
"telefoneDono": "(11) 99999-9999",
"servico": "Banho e Tosa",
"data": "2026-06-15"
}

*/