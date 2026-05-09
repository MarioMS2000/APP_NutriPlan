import mongoose from "mongoose";

const ingredientSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        unit: {
            type: String,
            required: true,
            trim: true,
        },
    },
    { _id: false }
);

const macrosSchema = new mongoose.Schema(
    {
        protein: {
            type: Number,
            required: true,
        },
        carbs: {
            type: Number,
            required: true,
        },
        fat: {
            type: Number,
            required: true,
        },
    },
    { _id: false }
);

const recipeSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        image: {
            type: String,
            required: true,
        },
        prepTime: {
            type: Number,
            required: true,
        },
        difficulty: {
            type: String,
            enum: ["easy", "medium", "hard"],
            default: "easy",
        },
        dietType: {
            type: String,
            enum: ["standard", "vegetarian", "vegan", "gluten_free"],
            default: "standard",
        },
        calories: {
            type: Number,
            required: true,
        },
        macros: {
            type: macrosSchema,
            required: true,
        },
        ingredients: {
            type: [ingredientSchema],
            required: true,
        },
        steps: {
            type: [String],
            required: true,
        },
        tags: {
            type: [String],
            default: [],
        },
        createdBy: {
            type: String,
            required: false,
        },
        isFeatured: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;