import { DataTypes } from "sequelize"; // Sirve para decirle a Sequelize qué tipo tiene cada columna texto, numero... | DataTypes.STRING → VARCHAR
import sequelize from "../config/postgres.js"; // Traes la conexión

// Modelo Tabla User
const User = sequelize.define(
    "User",
    {
        id: {
            type: DataTypes.UUID, // generara un codigo unico y seguro para api
            defaultValue: DataTypes.UUIDV4, // se genera automáticamente al crear un usuario
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false, // allowNull: false → obligatorio
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true, // no se puede repetir
            validate: {
                isEmail: true, // valida formato email
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM("user", "admin"),
            defaultValue: "user",
        },
    },
    {
        tableName: "users",
        timestamps: true, // Le dices a Sequelize que añada automáticamente: createdAt (cuando se creo) y updatedAt (cuando se actualizo) a cada registro
    }
);

export default User;