import sequelize from "../config/postgres.js"; // Importamos la conexión
import User from "./User.js"; // Importamos el Modelo
import NutritionProfile from "./NutritionProfile.js"; // Modelo

// Relacion un user a un NutritionProfile
User.hasOne(NutritionProfile, {
    foreignKey: "userId",
    onDelete: "CASCADE",
});

// Relación inversa: un perfil nutricional pertenece a un usuario
NutritionProfile.belongsTo(User, {
    foreignKey: "userId",
});

const syncDatabase = async () => {
    await sequelize.sync({ alter: true }); // sync() -> crea las tablas que falten en la base de datos según mis modelos | { alter: true } -> si la tabla ya existe, compárala con el modelo y ajústala
    console.log("Base de datos sincronizada");
};

export { sequelize, User, NutritionProfile, syncDatabase };