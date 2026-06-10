import express from "express";
import conectarDB from "./db.js";
import router from "./src/routes/matricula.js";

conectarDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Rota inicial
app.get("/", (req, res) => {
    res.send("API da Academia Lions está operante!");
})

// Rotas
app.use("/matriculas", router);

// Inciar servidor
app.listen(PORT, () => {
    console.log(`Servidor operando com sucesso na porta ${PORT}`);
});