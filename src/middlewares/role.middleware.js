// Sirve para proteger rutas según el tipo de usuario ya sea roleMiddleware("admin") o roleMiddleware("admin", "user")
export const roleMiddleware = (...allowedRoles) => { // ...allowedRoles puedes pasar varios roles ( ... -> recoge todos los argumentos que me pasen y mételos en un array)
    return (req, res, next) => {

        if (!req.user) {
            return res.status(401).json({
                ok: false,
                message: "Usuario no autenticado",
            });
        }

        // usuario, esta dentro de los roles permitidos?
        if (!allowedRoles.includes(req.user.role)) { // allowedRoles = ["admin"] req.user.role = "user" y "user" no está permitido, pues falla 
            return res.status(403).json({ // 403 -> autenticado pero no tienes permisos
                ok: false,
                message: "No tienes permisos para acceder a esta ruta",
            });
        }

        next();
    };
};