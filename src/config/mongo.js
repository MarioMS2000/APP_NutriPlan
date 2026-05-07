import mongoose from "mongoose"; // Librería que permite conectar Node con MongoDB y trabajar con modelos/documentos
import dotenv from "dotenv"; // Leer .env

dotenv.config(); // Así puedes leer process.env.MONGO_URI...


// Conecta directamente con await mongoose.connec
const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        process.exit(1); // Esto mata el proceso si Mongo no conecta
    }
};

export default connectMongoDB;
