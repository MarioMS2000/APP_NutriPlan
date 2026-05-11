import { WeeklyPlan } from "../models/index.js";
import Recipe from "../models/Recipe.js";

export const addRecipeToWeeklyPlan = async (req, res) => {
    try {
        const { recipeId } = req.params;
        const { day, mealType } = req.body;

        if (!day || !mealType) {
            return res.status(400).json({
                ok: false,
                message: "Día y tipo de comida son obligatorios",
            });
        }

        const planItem = await WeeklyPlan.create({
            userId: req.user.id,
            recipeId,
            day,
            mealType,
        });

        res.status(201).json({
            ok: true,
            message: "Receta añadida al plan semanal",
            planItem,
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: "Error al añadir receta al plan semanal",
            error: error.message,
        });
    }
};

export const getWeeklyPlan = async (req, res) => {
    try {
        const planItems = await WeeklyPlan.findAll({
            where: {
                userId: req.user.id,
            },
        });

        const recipeIds = planItems.map((item) => item.recipeId); // Recorres los elementos del plan y sacas solo los IDs de recetas

        // Busco en MongoDB las recetas completas
        const recipes = await Recipe.find({
            _id: { $in: recipeIds },
        });

        // Recorro cada elemento del plan semanal
        const plan = planItems.map((item) => {
            // Comparo el ID de Mongo con el recipeId guardado en PostgreSQL. recipe._id es un objeto y lo transformamos en String para compararlo con el otro String
            const recipe = recipes.find(
                (recipe) => recipe._id.toString() === item.recipeId
            );

            return {
                id: item.id,
                day: item.day,
                mealType: item.mealType,
                recipe,
            };
        });

        res.status(200).json({
            ok: true,
            plan,
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: "Error al obtener plan semanal",
            error: error.message,
        });
    }
};

export const removeRecipeFromWeeklyPlan = async (req, res) => {
    try {
        const { id } = req.params;

        const planItem = await WeeklyPlan.findOne({
            where: {
                id,
                userId: req.user.id,
            },
        });

        if (!planItem) {
            return res.status(404).json({
                ok: false,
                message: "Elemento del plan no encontrado",
            });
        }

        await planItem.destroy();

        res.status(200).json({
            ok: true,
            message: "Receta eliminada del plan semanal",
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: "Error al eliminar receta del plan semanal",
            error: error.message,
        });
    }
};