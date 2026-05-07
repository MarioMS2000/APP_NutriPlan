import { Sequelize } from "sequelize"; // Conexión del backend con PostgreSQL usando Sequelize
import dotenv from "dotenv"; // Leer variables del .env

dotenv.config(); // Permite leer cosas como DB_NAME...

// Crea una instancia de conexión
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: "postgres",
        logging: false,
    }
);

export default sequelize;
