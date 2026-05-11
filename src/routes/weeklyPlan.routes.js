import { Router } from "express"; // sistema de rutas de Express. Router sirve para crear grupos de rutas
import { addRecipeToWeeklyPlan, getWeeklyPlan, removeRecipeFromWeeklyPlan } from "../controllers/weeklyPlan.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

// GET -> http://localhost:3000/api/weekly-plan
router.get("/", authMiddleware, getWeeklyPlan);
// POST -> http://localhost:3000/api/weekly-plan/ID_RECETA
router.post("/:recipeId", authMiddleware, addRecipeToWeeklyPlan);
// DELETE -> http://localhost:3000/api/weekly-plan
router.delete("/:id", authMiddleware, removeRecipeFromWeeklyPlan);

export default router;