import { Router } from "express"; // sistema de rutas de Express. Router sirve para crear grupos de rutas
import { getMyNutritionProfile, createNutritionProfile, updateNutritionProfile } from "../controllers/nutritionProfile.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

// GET -> http://localhost:3000/api/nutrition-profile/me
router.get("/me", authMiddleware, getMyNutritionProfile);
// POST -> http://localhost:3000/api/nutrition-profile
router.post("/", authMiddleware, createNutritionProfile);
// PUT -> http://localhost:3000/api/nutrition-profile
router.put("/", authMiddleware, updateNutritionProfile);

export default router;