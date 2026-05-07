import jwt from "jsonwebtoken"; // Importas librería jsonwebtoken -> crea y verifica tokens JWT (token sirve para identificar al usuario en futuras peticiones)

export const generateToken = (user) => { // user -> usuario de la bbdd
    return jwt.sign( // jwt.sign() crea un JWT firmado (significa que el token lleva una firma secreta para comprobar luego que no fue manipulado)
        // Información guardas en JWT
        {
            id: user.id,
            email: user.email,
            role: user.role,
        },
        // Firmas el token que está en .env
        process.env.JWT_SECRET,
        {
            // Duración token que está en .env
            expiresIn: process.env.JWT_EXPIRES_IN || "1d",
        }
    );
};