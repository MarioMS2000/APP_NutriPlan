// middleware de autenticación. Sirve para proteger rutas. Antes de entrar a una ruta privada, comprueba si el usuario tiene un token válido.
import jwt from "jsonwebtoken";
import { User } from "../models/index.js";

export const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization; // Autorización de la petición

        if (!authHeader || !authHeader.startsWith("Bearer ")) { // "Bearer " formato estándar para enviar tokens en el header authorization (quien porta ese token, tiene acceso)
            return res.status(401).json({
                ok: false,
                message: "Token no proporcionado",
            });
        }

        const token = authHeader.split(" ")[1]; // Viene así Bearer abc123 con split así ["Bearer", "abc123"] y con [1] así abc123

        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verificas token con clave secreta. Comprueba que el token sea válido, que no haya sido manipulado y que no esté expirado

        // Buscamos usuario por id
        const user = await User.findByPk(decoded.id, { // En decoded tendras todos los datos id: user.id, email: user.email, role: user.role
            attributes: { exclude: ["password"] }, // Trae el usuario y excluye la contraseña
        });

        if (!user) {
            return res.status(401).json({
                ok: false,
                message: "Usuario no encontrado",
            });
        }

        req.user = user; // Guardo el usuario dentro de la request y te permite hacer req.user.id, req.user.email, req.user.role

        next(); // Dejo pasar a la siguiente función o ruta. Si el token es correcto y el usuario existe, continúa

    } catch (error) {

        return res.status(401).json({
            ok: false,
            message: "Token inválido o expirado",
        });
    }
}