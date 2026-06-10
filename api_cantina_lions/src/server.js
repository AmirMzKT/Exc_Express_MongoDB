import express from "express";
import conectarDB from "../src/db.js";
import router from "../src/routes/pedido.js";

conectarDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Rota inicial
app.get("/", (req, res) =>{
    res.send("API da Cantina Lions está operante!");
})

// Rotas
app.use("/pedidos", router);

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor operando com sucesso na porta ${PORT}`);
});