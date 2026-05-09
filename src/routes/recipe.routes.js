import { Router } from "express";
import { getAllRecipes, getRecipeById, createRecipe } from "../controllers/recipe.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";


const router = Router();

// GET -> http://localhost:3000/api/recipes
router.get("/", getAllRecipes);
// GET -> GET http://localhost:3000/api/recipes/684f3f8b8a1c8c2d7f7f1234
router.get("/:id", getRecipeById);
// POST -> http://localhost:3000/api/recipes
router.post("/", authMiddleware, roleMiddleware("admin"), createRecipe);

export default router;