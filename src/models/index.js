import sequelize from "../config/postgres.js"; // Importamos la conexión
// Importamos los Modelos
import User from "./User.js";
import NutritionProfile from "./NutritionProfile.js";
import Favorite from "./Favorite.js";

// Relacion un user a un NutritionProfile
User.hasOne(NutritionProfile, {
    foreignKey: "userId",
    onDelete: "CASCADE",
});

// Relación inversa: un perfil nutricional pertenece a un usuario
NutritionProfile.belongsTo(User, {
    foreignKey: "userId",
});

// Relacion User tiene muchos Favorite
User.hasMany(Favorite, {
    foreignKey: "userId",
    onDelete: "CASCADE",
});

// Cada favorito pertenece a un usuario
Favorite.belongsTo(User, {
    foreignKey: "userId",
});

const syncDatabase = async () => {
    await sequelize.sync({ alter: true }); // sync() -> crea las tablas que falten en la base de datos según mis modelos | { alter: true } -> si la tabla ya existe, compárala con el modelo y ajústala
    console.log("Base de datos sincronizada");
};

export { sequelize, User, NutritionProfile, Favorite, syncDatabase };