import { Router } from "express"; // sistema de rutas de Express. Router sirve para crear grupos de rutas
import { register, login } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";

const router = Router();

// POST -> http://localhost:3000/api/auth/register
router.post("/register", register);
// POST -> http://localhost:3000/api/auth/login
router.post("/login", login);

// GET -> http://localhost:3000/api/auth/me
router.get("/me", authMiddleware, (req, res) => {
    res.status(200).json({
        ok: true,
        user: req.user, // usuario autenticado
    });
});

// GET Ruta temporal -> http://localhost:3000/api/auth/admin-test
router.get("/admin-test", authMiddleware, roleMiddleware("admin"), (req, res) => {
        res.status(200).json({
            ok: true,
            message: "Acceso permitido solo para admin",
            user: req.user,
        });
    }
);

export default router;