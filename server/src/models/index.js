import sequelize from "../config/postgres.js"; // Importamos la conexión
import User from "./User.js"; // Importamos el Modelo


const syncDatabase = async () => {
    await sequelize.sync({ alter: true }); // sync() -> crea las tablas que falten en la base de datos según mis modelos | { alter: true } -> si la tabla ya existe, compárala con el modelo y ajústala
    console.log("Base de datos sincronizada");
};

export { sequelize, User, syncDatabase };