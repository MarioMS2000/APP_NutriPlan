import { Router } from "express"; // sistema de rutas de Express. Router sirve para crear grupos de rutas

import { addFavorite, getFavorites, removeFavorite } from "../controllers/favorite.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

// POST -> http://localhost:3000/api/favorites/ID_RECETA
router.post("/:recipeId", authMiddleware, addFavorite);
// GET -> http://localhost:3000/api/favorites
router.get("/", authMiddleware, getFavorites);
// DELETE -> http://localhost:3000/api/favorites/ID_RECETA
router.delete("/:recipeId", authMiddleware, removeFavorite);

export default router;