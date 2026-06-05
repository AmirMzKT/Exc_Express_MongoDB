import mongoose from "mongoose";

const agendamentoSchema = new mongoose.Schema(
    {
        nomePet: {
            type: String,
            required: [true, "O nome é obrigatório."],
        },
        especie: {
            type: String,
            required: [true, "A espécie é obrigatória."],
            enum: {
                values: ["Cão", "Gato", "Outro"],
                message: "Apenas Cão, Gato e Outro"
            }
        },
        nomeDono: {
            type: String,
            required: [true, "O nome é obrigatório."],
        },
        telefoneDono: {
            type: String,
            required: [true, "O número de telefone é obrigatório."]
        },
        servico: {
            type: String,
            required: [true, "O serviço é obrigatório."],
            enum: {
                values: ["Banho", "Tosa", "Banho e Tosa"],
                message: "Serviço inválido. Apenas Banho, Tosa ou Banho e Tosa"
            }
        },
        data: {
            type: String,
            required: [true, "A data é obrigatória."]
        },
        valor: {
            type: Number
        },
        status: {
            type: String,
            default: "Agendado",
            enum: {
                values: ["Agendado", "Concluído", "Cancelado"],
                message: "Status inválido."
            }
        }
    }
);

const Agendamento = mongoose.model("Agendamento", agendamentoSchema);
export default Agendamento;