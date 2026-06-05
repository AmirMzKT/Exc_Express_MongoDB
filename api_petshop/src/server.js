import express from "express";
import conectarDB from "./database.js";
import agendamentoRouter from "./routes/agendamento.js";

const app = express();
const PORT = process.env.PORT || 3000;

conectarDB();

app.use(express.json());

// Rota inicial
app.get("/", (req, res) => {
    res.send("API do Petshop PetLions está operante!");
});

// Rotas
app.use("/agendamentos", agendamentoRouter);

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor operando com sucesso na porta ${PORT}`);
});