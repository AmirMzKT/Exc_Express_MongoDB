import mongoose, { mongo } from "mongoose";

/*
materialId : Tipo String , obrigatório. Esse campo deve guardar o _id do material emprestado.
nomeAluno : Tipo String , obrigatório.
turma : Tipo String , obrigatório.
dataEmprestimo : Tipo String , obrigatório (ex: "2026-06-15" ).
diasEmprestimo : Tipo Number , obrigatório.
multaPrevista : Tipo Number (será calculado automaticamente pela API).
status : Tipo String , com valor padrão de "Emprestado" (deve aceitar apenas: Emprestado ,
Devolvido ou Atrasado ).
*/

const emprestimoSchema = new mongoose.Schema(
    {
        materialId: {
            type: String,
            required: [true, "Informe o ID do material."]
        },
        nomeAluno: {
            type: String,
            required: [true, "Informe o nome do aluno."]
        },
        turma: {
            type: String,
            required: [true, "Informe a turma do aluno."]
        },
        dataEmprestimo: {
            type: String,
            required: [true, "Informe a data do empréstimo."]
        },
        diasEmprestimo: {
            type: Number,
            required: [true, "Informe os dias do empréstimo."]
        },
        multaPrevista: {
            type: Number
        },
        status: {
            default: "Emprestado",
            enum: {
                values: ["Emprestado", "Devolvido", "Atrasado"],
                message: "Status inválido."
            }
        }
    }
);

const Emprestimo = mongoose.model("Empréstimo", emprestimoSchema);
export default Emprestimo;