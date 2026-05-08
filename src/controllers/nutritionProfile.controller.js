import { NutritionProfile } from "../models/index.js"; // Importamos Modelo

// Obtener perfil nutricional
export const getMyNutritionProfile = async (req, res) => {
    try {
        const profile = await NutritionProfile.findOne({
            where: { userId: req.user.id },
        });

        res.status(200).json({
            ok: true,
            profile,
        });

    } catch (error) {

        res.status(500).json({
            ok: false,
            message: "Error al obtener el perfil nutricional",
        });
    }
};

// Crear perfil nutricional
export const createNutritionProfile = async (req, res) => {

    try {
        const existingProfile = await NutritionProfile.findOne({
            where: { userId: req.user.id },
        });

        if (existingProfile) {
            return res.status(409).json({
                ok: false,
                message: "Ya tienes un perfil nutricional creado",
            });
        }

        // Creo un nuevo perfil en la bbdd. ...req.body -> copia todos los datos que llegaron desde el front del body a la bbbdd
        // req.user.id -> Añade el ID del usuario autenticado. Ese req.user lo puso antes el authMiddleware. Sirve para vincular el perfil con el usuario logueado
        const profile = await NutritionProfile.create({
            ...req.body,
            userId: req.user.id,
        });

        res.status(201).json({
            ok: true,
            message: "Perfil nutricional creado correctamente",
            profile,
        });

    } catch (error) {

        res.status(500).json({
            ok: false,
            message: "Error al crear el perfil nutricional",
            error: error.message,
        });
    }
};

// Actualizar perfil nutricional
export const updateNutritionProfile = async (req, res) => {

    try {
        const profile = await NutritionProfile.findOne({
            where: { userId: req.user.id },
        });

        if (!profile) {
            return res.status(404).json({
                ok: false,
                message: "Perfil nutricional no encontrado",
            });
        }

        await profile.update(req.body); // Coge el body, actualiza el perfil y espera a que se actualice

        res.status(200).json({
            ok: true,
            message: "Perfil nutricional actualizado correctamente",
            profile,
        });

    } catch (error) {

        res.status(500).json({
            ok: false,
            message: "Error al actualizar el perfil nutricional",
            error: error.message,
        });

    }
};