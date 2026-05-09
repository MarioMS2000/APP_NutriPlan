import { Router } from "express";
import { getAllRecipes, getRecipeById, createRecipe, updateRecipe, deleteRecipe } from "../controllers/recipe.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";


const router = Router();

// GET -> http://localhost:3000/api/recipes
router.get("/", getAllRecipes);
// GET -> GET http://localhost:3000/api/recipes/69ff3737a2a491da90a48637
router.get("/:id", getRecipeById);
// POST -> http://localhost:3000/api/recipes
router.post("/", authMiddleware, roleMiddleware("admin"), createRecipe);
// PUT -> http://localhost:3000/api/recipes/69ff3737a2a491da90a48637
router.put("/:id", authMiddleware, roleMiddleware("admin"), updateRecipe);
// DELETE -> http://localhost:3000/api/recipes/69ff3737a2a491da90a48637
router.delete("/:id", authMiddleware, roleMiddleware("admin"), deleteRecipe);

export default router;