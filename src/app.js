// Importas dependencias -> importando las librerías que instale con npm
import express from "express"; // framework que crea el servidor y maneja rutas
import cors from "cors"; // Permite que el frontend pueda llamar al backend sin que el navegador lo bloquee.

// Import Routes
import authRoutes from "./routes/auth.routes.js";
import nutritionProfileRoutes from "./routes/nutritionProfile.routes.js";
import recipeRoutes from "./routes/recipe.routes.js";

// Creo la app
const app = express(); // Inicializo Express


app.use(cors()); // Activas CORS, permite peticiones desde otros orígenes. Para que el frontend pueda conectarse al backend
app.use(express.json()); //Activas JSON en requests -> cuando me manden JSON en el body, conviértelo automáticamente a objeto JS

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/nutrition-profile", nutritionProfileRoutes);
app.use("/api/recipes", recipeRoutes);

// http://localhost:3000/api/health
app.get("/api/health", (req, res) => {
    res.status(200).json({
        ok: true,
        message: "La API de NutriPlan está en funcionamiento",
    });
});

export default app;