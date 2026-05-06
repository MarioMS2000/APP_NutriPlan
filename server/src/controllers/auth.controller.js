import bcrypt from "bcrypt"; // Sirve para encriptar la contraseña
import { User } from "../models/index.js"; // Trae el modelo User para poder buscar y crear usuarios en la base de datos

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                ok: false,
                message: "Se requiere nombre de usuario, correo electrónico y contraseña.",
            });
        }

        const existingUser = await User.findOne({ where: { email } }); // búscame un usuario cuyo email sea igual al email que me llegó (¿Existe un usuario con este email?)

        // Si el email ya fue registrado
        if (existingUser) {
            return res.status(409).json({
                ok: false,
                message: "El usuario ya existe",
            });
        }

        // Hashear password
        const hashedPassword = await bcrypt.hash(password, 10);// 10 -> salt rounds.Eso controla cuántas veces bcrypt procesa la contraseña. Más alto = más seguro y más alto = más lento. 10 es el valor estándar más usado

        // Crear usuario 
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        // Devolvemos el usuario con el mensaje de registrado correcto
        res.status(201).json({
            ok: true,
            message: "Usuario registrado correctamente",
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
            },
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: "Error del servidor",
            error: error.message,
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

        // Buscar usuario
        const user = await User.findOne({ where: { email } });

        if (!user) {
            // 401 no autorizado.
            return res.status(401).json({
                ok: false,
                message: "Credenciales incorrectas",
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);// Comparamos contraseña. password → la que escribió el usuario y user.password → la hash guardada en BD

        // Si no coincide isPasswordValid
        if (!isPasswordValid) {
            return res.status(401).json({
                ok: false,
                message: "Credenciales incorrectas",
            });
        }

        // Login exitoso y devolvemos el user
        res.status(201).json({
            ok: true,
            message: "Login correcto",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: "Error del servidor",
            error: error.message,
        });
    }
};