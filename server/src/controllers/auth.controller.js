import { registerUser, loginUser } from "../services/auth.service.js";

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                ok: false,
                message: "Se requiere nombre de usuario, correo electrónico y contraseña.",
            });
        }

        const user = await registerUser({ name, email, password }); // Recibe el return de auth.service de registerUser

        // Devolvemos el usuario con el mensaje de registrado correcto
        res.status(201).json({
            ok: true,
            message: "Usuario registrado correctamente",
            user,
        });

    } catch (error) {
        res.status(error.statusCode || 500).json({
            ok: false,
            message: error.message || "Error del servidor",
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                ok: false,
                message: "Email y contraseña son obligatorios",
            });
        }

        const { token, user } = await loginUser({ email, password }); // Recibe el return de auth.service de loginUser

        // Login exitoso y devolvemos el user
        res.status(201).json({
            ok: true,
            message: "Login correcto",
            token,
            user,
        });

    } catch (error) {
        res.status(error.statusCode || 500).json({
            ok: false,
            message: error.message || "Error del servidor",
        });
    }
};