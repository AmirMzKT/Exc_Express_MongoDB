import mongoose from "mongoose";

const matriculaSchema = new mongoose.Schema(
    {
        nomeAluno: {
            type: String,
            required: [true, "O nome do aluno é obrigatório."]
        },
        idade: {
            type: Number,
            required: [true, "A idade do aluno é obrigatório"]
        },
        modalidade: {
            type: String,
            required: [true, "Insira a modalidade."],
            enum: {
                values: ["Musculação", "Funcional", "Dança"],
                message: "Serviço inválido! Apenas as modalidades Musculação, Funcional ou Dança."
            }
        },
        plano: {
            type: String,
            required: [true, "Informe o plano desejado."],
            enum: {
                values: ["Mensal", "Trimestral", "Semestral"],
                message: "Plano inválido! Apenas Plano Mensal, Trimestral ou Semestral."
            }
        },
        dataMatricula: {
            type: String,
            required: [true, "Informe a data da matrícula"]
        },
        valorMensal: {
            type: Number
        },
        valorTotal: {
            type: Number
        },
        status: {
            type: String,
            default: "Ativa",
            enum: {
                values: ["Ativa", "Pausada", "Cancelada"],
                message: "Status inválido. Informe apenas Ativa, Pausada ou Cancelada"
            }
        }
    }
);

const Matricula = mongoose.model("Matrícula", matriculaSchema);
export default Matricula;

/*
Exemplo
nomeAluno : Tipo String , obrigatório.
idade : Tipo Number , obrigatório.
modalidade : Tipo String , obrigatório (deve aceitar apenas: Musculação , Funcional ou
Dança ).
plano : Tipo String , obrigatório (deve aceitar apenas: Mensal , Trimestral ou
Semestral ).
dataMatricula : Tipo String , obrigatório (ex: "2026-06-15" ).
valorMensal : Tipo Number (será calculado automaticamente pela API).
valorTotal : Tipo Number (será calculado automaticamente pela API).
status : Tipo String , com valor padrão de "Ativa" (deve aceitar apenas: Ativa ,
Pausada ou Cancelada ).
*/