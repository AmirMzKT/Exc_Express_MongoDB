import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: '../.env' });

const MONGO_URI = process.env.MONGO_URI;

const conectarDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Conectado ao MongoDB! Database: Petshop");
    } catch (error) {
        console.log("Erro ao conectar ao MongoDB", error.message);
    }
};

export default conectarDB