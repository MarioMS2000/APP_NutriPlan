import { DataTypes } from "sequelize"; // Sirve para decirle a Sequelize qué tipo tiene cada columna texto, numero... | DataTypes.STRING → VARCHAR
import sequelize from "../config/postgres.js"; // Traes la conexión


const WeeklyPlan = sequelize.define(
    "WeeklyPlan",
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
        day: {
            type: DataTypes.ENUM(
                "monday",
                "tuesday",
                "wednesday",
                "thursday",
                "friday",
                "saturday",
                "sunday"
            ),
            allowNull: false,
        },
        mealType: {
            type: DataTypes.ENUM("breakfast", "lunch", "dinner", "snack"),
            allowNull: false,
        },
    },
    {
        tableName: "weekly_plans",
        timestamps: true,
    }
);

export default WeeklyPlan;