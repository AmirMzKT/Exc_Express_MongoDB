import express from "express";
import conectarDB from "./database.js";
import imovelRoutes from "./src/routes/imovel.js";
import reservaRoutes from "./src/routes/reserva.js";
import avaliacaoRoutes from "./src/routes/avaliacao.js";

conectarDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Rota inicial
app.get("/", (req, res) => {
    res.send("API da startup Imóvel Lions está operante");
});

// Rotas
app.use("/imoveis", imovelRoutes);
app.use("/reservas", reservaRoutes);
app.use("/avaliacoes", avaliacaoRoutes);

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor operando com sucesso na porta ${PORT}`);
});