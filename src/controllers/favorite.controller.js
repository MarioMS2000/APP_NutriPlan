import { Favorite } from "../models/index.js";

import Recipe from "../models/Recipe.js"; // Traemos las recetas del Modelo de Mongoose

export const addFavorite = async (req, res) => {
    try {
        const { recipeId } = req.params; // POST /api/favorites/684f3f8...

        // Verificamos si ya existe
        const existingFavorite = await Favorite.findOne({
            where: {
                userId: req.user.id,
                recipeId,
            },
        });

        if (existingFavorite) {
            return res.status(409).json({
                ok: false,
                message: "La receta ya está en favoritos",
            });
        }

        const favorite = await Favorite.create({
            userId: req.user.id,
            recipeId,
        });

        res.status(201).json({
            ok: true,
            message: "Receta añadida a favoritos",
            favorite,
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: "Error al añadir favorito",
            error: error.message,
        });
    }
};

export const getFavorites = async (req, res) => {
    try {
        const favorites = await Favorite.findAll({
            where: {
                userId: req.user.id,
            },
        });

        // Recorremos todos esos favoritos para sacar solo los IDs de las recetas
        const recipeIds = favorites.map(
            (favorite) => favorite.recipeId // Por cada favorito, devuelve su recipeId
        );

        // Buscar en Mongoo las recetas reales. Buscas recetas cuyo _id esté dentro del array recipeIds. $in significa: que esté incluido en esta lista
        const recipes = await Recipe.find({
            _id: { $in: recipeIds },
        });

        res.status(200).json({
            ok: true,
            recipes,
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: "Error al obtener favoritos",
            error: error.message,
        });
    }
};

export const removeFavorite = async (req, res) => {
    try {
        const { recipeId } = req.params;

        const favorite = await Favorite.findOne({
            where: {
                userId: req.user.id,
                recipeId,
            },
        });

        if (!favorite) {
            return res.status(404).json({
                ok: false,
                message: "Favorito no encontrado",
            });
        }

        await favorite.destroy(); // Elimina de PostgreSQL.

        res.status(200).json({
            ok: true,
            message: "Favorito eliminado correctamente",
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: "Error al eliminar favorito",
            error: error.message,
        });
    }
};