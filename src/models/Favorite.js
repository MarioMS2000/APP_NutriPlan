import { DataTypes } from "sequelize"; // Sirve para decirle a Sequelize qué tipo tiene cada columna texto, numero... | DataTypes.STRING → VARCHAR
import sequelize from "../config/postgres.js"; // Traes la conexión


const Favorite = sequelize.define(
    "Favorite",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        recipeId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: "favorites",
        timestamps: true,
    }
);

export default Favorite;