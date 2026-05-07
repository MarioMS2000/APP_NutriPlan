import bcrypt from "bcrypt"; // Sirve para encriptar la contraseña
import { User } from "../models/index.js"; // Trae el modelo User para poder buscar y crear usuarios en la base de datos
import { generateToken } from "./token.service.js";

export const registerUser = async ({ name, email, password }) => {
    const existingUser = await User.findOne({ where: { email } }); // búscame un usuario cuyo email sea igual al email que me llegó (¿Existe un usuario con este email?)

    // Si el email ya fue registrado
    if (existingUser) {
        const error = new Error("El usuario ya existe");
        error.statusCode = 409;
        throw error;
    }

    // Hashear password
    const hashedPassword = await bcrypt.hash(password, 10);// 10 -> salt rounds.Eso controla cuántas veces bcrypt procesa la contraseña. Más alto = más seguro y más alto = más lento. 10 es el valor estándar más usado

    // Crear usuario 
    const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    return {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
    };
};


export const loginUser = async ({ email, password }) => {
    // Buscar usuario
    const user = await User.findOne({ where: { email } });

    if (!user) {
        // 401 no autorizado.
        const error = new Error("Credenciales incorrectas");
        error.statusCode = 401;
        throw error;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);// Comparamos contraseña. password → la que escribió el usuario y user.password → la hash guardada en BD

    // Si no coincide isPasswordValid
    if (!isPasswordValid) {
        const error = new Error("Credenciales incorrectas");
        error.statusCode = 401;
        throw error;
    }

    const token = generateToken(user);

    return {
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
    };
};
