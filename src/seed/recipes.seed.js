import mongoose from "mongoose";
import dotenv from "dotenv";

import Recipe from "../models/Recipe.js";

dotenv.config();

const recipes = [
    {
        title: "Tostadas con aguacate",
        description: "Desayuno saludable y rápido.",
        image:
            "https://images.unsplash.com/photo-1525351484163-7529414344d8",
        prepTime: 10,
        difficulty: "easy",
        dietType: "vegetarian",
        calories: 350,
        macros: {
            protein: 10,
            carbs: 30,
            fat: 18,
        },
        ingredients: [
            {
                name: "Pan integral",
                quantity: 2,
                unit: "rebanadas",
            },
            {
                name: "Aguacate",
                quantity: 1,
                unit: "unidad",
            },
        ],
        steps: [
            "Tostar el pan.",
            "Machacar el aguacate.",
            "Untar sobre las tostadas.",
        ],
        tags: ["breakfast", "healthy"],
        isFeatured: true,
    },

    {
        title: "Ensalada de quinoa",
        description: "Receta fresca y rica en proteína vegetal.",
        image:
            "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
        prepTime: 20,
        difficulty: "easy",
        dietType: "vegan",
        calories: 480,
        macros: {
            protein: 18,
            carbs: 55,
            fat: 14,
        },
        ingredients: [
            {
                name: "Quinoa",
                quantity: 100,
                unit: "g",
            },
            {
                name: "Tomate",
                quantity: 2,
                unit: "unidades",
            },
        ],
        steps: [
            "Cocinar quinoa.",
            "Cortar verduras.",
            "Mezclar todo.",
        ],
        tags: ["vegan", "lunch"],
        isFeatured: false,
    },

    {
        title: "Pasta fitness",
        description: "Pasta alta en proteína ideal para deportistas.",
        image:
            "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9",
        prepTime: 30,
        difficulty: "medium",
        dietType: "standard",
        calories: 650,
        macros: {
            protein: 40,
            carbs: 75,
            fat: 15,
        },
        ingredients: [
            {
                name: "Pasta integral",
                quantity: 120,
                unit: "g",
            },
            {
                name: "Pollo",
                quantity: 200,
                unit: "g",
            },
        ],
        steps: [
            "Cocer pasta.",
            "Cocinar pollo.",
            "Mezclar con salsa ligera.",
        ],
        tags: ["high-protein", "dinner"],
        isFeatured: true,
    },

    {
        title: "Pollo al curry",
        description: "Receta cremosa de pollo con especias y arroz.",
        image:
            "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d",
        prepTime: 35,
        difficulty: "medium",
        dietType: "standard",
        calories: 680,
        macros: {
            protein: 45,
            carbs: 60,
            fat: 20,
        },
        ingredients: [
            {
                name: "Pechuga de pollo",
                quantity: 250,
                unit: "g",
            },
            {
                name: "Arroz basmati",
                quantity: 120,
                unit: "g",
            },
        ],
        steps: [
            "Cocinar el pollo.",
            "Preparar la salsa curry.",
            "Servir con arroz.",
        ],
        tags: ["high-protein", "dinner"],
        isFeatured: false,
    },

    {
        title: "Wrap saludable de pavo",
        description: "Wrap ligero y rápido para comidas saludables.",
        image:
            "https://images.unsplash.com/photo-1626700051175-6818013e1d4f",
        prepTime: 15,
        difficulty: "easy",
        dietType: "standard",
        calories: 520,
        macros: {
            protein: 30,
            carbs: 40,
            fat: 14,
        },
        ingredients: [
            {
                name: "Tortilla integral",
                quantity: 1,
                unit: "unidad",
            },
            {
                name: "Pavo",
                quantity: 120,
                unit: "g",
            },
        ],
        steps: [
            "Calentar tortilla.",
            "Añadir ingredientes.",
            "Enrollar y servir.",
        ],
        tags: ["quick", "lunch"],
        isFeatured: true,
    },

    {
        title: "Arroz con pollo fitness",
        description: "Comida equilibrada alta en proteína y fácil de preparar.",
        image:
            "https://images.unsplash.com/photo-1512058564366-18510be2db19",
        prepTime: 20,
        difficulty: "easy",
        dietType: "standard",
        calories: 650,
        macros: {
            protein: 38,
            carbs: 60,
            fat: 14,
        },
        ingredients: [
            {
                name: "Arroz",
                quantity: 100,
                unit: "g",
            },
            {
                name: "Pechuga de pollo",
                quantity: 180,
                unit: "g",
            }
        ],
        steps: [
            "Cocer el arroz.",
            "Cocinar el pollo a la plancha.",
            "Servir juntos."
        ],
        tags: ["high-protein", "easy", "meal-prep"],
        isFeatured: false,
    }
];

const seedRecipes = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        await Recipe.insertMany(recipes);

        console.log("Recipes inserted successfully");

        process.exit();
    } catch (error) {
        console.error(error);

        process.exit(1);
    }
};

seedRecipes();