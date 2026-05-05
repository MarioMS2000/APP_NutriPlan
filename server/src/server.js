// Levanta Express y verifica que las dos bases de datos conecten antes de encender el servidor
import dotenv from "dotenv";
import app from "./app.js";
import sequelize from "./config/postgres.js";
import connectMongoDB from "./config/mongo.js";


dotenv.config(); // Le dice a Node que lea el archivo .env y meta esas variables en memoria para poder usarlas en la app

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log("PostgreSQL connected");

        await connectMongoDB();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Server startup error:", error.message);
        process.exit(1); // Mata el proceso cuando falla
    }
};

startServer();
