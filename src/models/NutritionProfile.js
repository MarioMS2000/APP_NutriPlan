import { DataTypes } from "sequelize";
import sequelize from "../config/postgres.js";

const NutritionProfile = sequelize.define(
    "NutritionProfile",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        height: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        weight: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        goal: {
            type: DataTypes.ENUM("lose_weight", "maintain_weight", "gain_muscle"),
            allowNull: false,
        },
        activityLevel: {
            type: DataTypes.ENUM("low", "medium", "high"),
            allowNull: false,
        },
        dietType: {
            type: DataTypes.ENUM("standard", "vegetarian", "vegan", "gluten_free"),
            defaultValue: "standard",
        },
        allergies: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        tableName: "nutrition_profiles",
        timestamps: true,
    }
);

export default NutritionProfile;