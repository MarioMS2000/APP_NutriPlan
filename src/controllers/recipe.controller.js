import Recipe from "../models/Recipe.js";

export const getAllRecipes = async (req, res) => {

    // Esto es para enviar al front, si es ok: true mandas el 200 y si es ok: false el 500 o lo que quieras
    try {
        const recipes = await Recipe.find();

        res.status(200).json({
            ok: true,
            recipes,
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: "Error al obtener las recetas",
            error: error.message,
        });
    }
};

export const getRecipeById = async (req, res) => {

    try {
        const { id } = req.params;

        const recipe = await Recipe.findById(id);

        if (!recipe) {
            return res.status(404).json({
                ok: false,
                message: "Receta no encontrada",
            });
        }

        res.status(200).json({
            ok: true,
            recipe,
        });

    } catch (error) {

        res.status(500).json({
            ok: false,
            message: "Error al obtener la receta",
            error: error.message,
        });
    }
};

export const createRecipe = async (req, res) => {
    // createdBy: req.user.id -> el id del ususario que esta logueado
    try {
        const recipe = await Recipe.create({
            ...req.body,
            createdBy: req.user.id,
        });

        res.status(201).json({
            ok: true,
            message: "Receta creada correctamente",
            recipe,
        });

    } catch (error) {

        res.status(500).json({
            ok: false,
            message: "Error al crear la receta",
            error: error.message,
        });

    }
};

export const updateRecipe = async (req, res) => {
    try {
        const { id } = req.params;

        //  new: true -> devuélveme el documento actualizado (sin eso Mongo devuelve el documento sin actualizar)
        // runValidators: true -> aplica las validaciones del schema también al actualizar. Por defecto, findByIdAndUpdate NO valida igual que .create(). Entonces podrías guardar cosas inválidas
        const recipe = await Recipe.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!recipe) {
            return res.status(404).json({
                ok: false,
                message: "Receta no encontrada",
            });
        }

        res.status(200).json({
            ok: true,
            message: "Receta actualizada correctamente",
            recipe,
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: "Error al actualizar la receta",
            error: error.message,
        });
    }
};

export const deleteRecipe = async (req, res) => {
    try {
        const { id } = req.params;

        const recipe = await Recipe.findByIdAndDelete(id);

        if (!recipe) {
            return res.status(404).json({
                ok: false,
                message: "Receta no encontrada",
            });
        }

        res.status(200).json({
            ok: true,
            message: "Receta eliminada correctamente",
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: "Error al eliminar la receta",
            error: error.message,
        });
    }
};