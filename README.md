# 🥗 NutriPlan BackEnd

Backend de **NutriPlan**, una API REST creada con **Node.js**, **Express**, **PostgreSQL**, **Sequelize**, **MongoDB** y **Mongoose** para gestionar usuarios, autenticación, perfiles nutricionales, recetas, favoritos y planes semanales.

🔗 **API desplegada en Render:** https://app-nutriplan-backend.onrender.com  
📦 **Repositorio GitHub:** https://github.com/MarioMS2000/APP_NutriPlan_BackEnd/tree/main

---

## 🚀 Descripción

NutriPlan BackEnd centraliza la lógica de servidor de la aplicación:

- 🔐 Registro, login y autenticación con JWT.
- 👤 Gestión del usuario autenticado.
- 🥦 Creación y edición del perfil nutricional.
- 🍽️ Consulta y administración de recetas.
- ⭐ Gestión de recetas favoritas.
- 📅 Gestión del plan semanal de comidas.
- 🩺 Endpoint de salud para comprobar que la API está activa.

La API está preparada para trabajar con un frontend externo mediante **CORS** y variables de entorno.

---

## 🧱 Arquitectura del proyecto

```txt
APP_NutriPlan_BackEnd/
├── src/
│   ├── app.js                     # Configuración principal de Express y rutas
│   ├── server.js                  # Arranque del servidor y conexión a bases de datos
│   ├── config/
│   │   ├── mongo.js               # Conexión con MongoDB mediante Mongoose
│   │   └── postgres.js            # Conexión con PostgreSQL mediante Sequelize
│   ├── controllers/               # Lógica de cada recurso de la API
│   │   ├── auth.controller.js
│   │   ├── favorite.controller.js
│   │   ├── nutritionProfile.controller.js
│   │   ├── recipe.controller.js
│   │   └── weeklyPlan.controller.js
│   ├── middlewares/               # Middlewares de seguridad y permisos
│   │   ├── auth.middleware.js
│   │   └── role.middleware.js
│   ├── models/                    # Modelos y relaciones de datos
│   │   ├── Favorite.js
│   │   ├── NutritionProfile.js
│   │   ├── Recipe.js
│   │   ├── User.js
│   │   ├── WeeklyPlan.js
│   │   └── index.js
│   ├── routes/                    # Definición de endpoints
│   │   ├── auth.routes.js
│   │   ├── favorite.routes.js
│   │   ├── nutritionProfile.routes.js
│   │   ├── recipe.routes.js
│   │   └── weeklyPlan.routes.js
│   ├── seed/
│   │   └── recipes.seed.js         # Script para cargar recetas iniciales
│   ├── services/                  # Servicios reutilizables
│   │   ├── auth.service.js
│   │   └── token.service.js
│   └── utils/                     # Utilidades del proyecto
├── package.json
├── package-lock.json
└── README.md
```

---

## 🧠 Cómo funciona por dentro

### 🌐 Capa HTTP

El archivo `src/app.js` crea la aplicación de **Express**, configura:

- `cors()` para permitir peticiones desde el frontend.
- `express.json()` para recibir cuerpos JSON.
- Las rutas principales bajo el prefijo `/api`.
- El endpoint `/api/health` para comprobar el estado de la API.

### 🔌 Arranque del servidor

El archivo `src/server.js`:

1. Carga variables de entorno con `dotenv`.
2. Verifica conexión con PostgreSQL.
3. Sincroniza modelos con Sequelize.
4. Conecta con MongoDB.
5. Levanta el servidor en `PORT` o en el puerto `3000`.

### 🗄️ Persistencia

El proyecto utiliza dos sistemas de base de datos:

- 🐘 **PostgreSQL + Sequelize** para usuarios, perfiles nutricionales, favoritos y planes semanales.
- 🍃 **MongoDB + Mongoose** para recetas.

### 🔐 Seguridad

La autenticación se realiza mediante **JWT**:

- El usuario inicia sesión y recibe un token.
- Las rutas privadas usan `authMiddleware`.
- Las rutas de administración usan además `roleMiddleware("admin")`.

---

## 🛠️ Tecnologías utilizadas

- 🟢 **Node.js**
- ⚡ **Express 5**
- 🐘 **PostgreSQL**
- 🔁 **Sequelize**
- 🍃 **MongoDB**
- 🧩 **Mongoose**
- 🔐 **JWT**
- 🧂 **bcrypt**
- 🌍 **CORS**
- 🔧 **dotenv**

---

## 📦 Instalación local

### 1. Clonar el repositorio

```bash
git clone https://github.com/MarioMS2000/APP_NutriPlan_BackEnd.git
cd APP_NutriPlan_BackEnd
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Crear el archivo `.env`

Crea un archivo `.env` en la raíz del proyecto:

```env
PORT=3000

DB_NAME=nombre_de_tu_base_postgres
DB_USER=usuario_postgres
DB_PASSWORD=password_postgres
DB_HOST=localhost
DB_PORT=5432

MONGO_URI=mongodb+srv://usuario:password@cluster.mongodb.net/nutriplan

JWT_SECRET=tu_clave_secreta
JWT_EXPIRES_IN=1d

FRONTEND_URL=http://localhost:5173
```

> ⚠️ No subas nunca el archivo `.env` a GitHub. Este proyecto ya lo ignora mediante `.gitignore`.

### 4. Ejecutar en desarrollo

```bash
npm run dev
```

La API quedará disponible en:

```txt
http://localhost:3000
```

---

## ▶️ Scripts disponibles

```bash
npm run dev
```

Arranca el servidor en modo desarrollo con `node --watch`.

```bash
npm start
```

Arranca el servidor en modo producción.

```bash
npm run seed:recipes
```

Carga recetas iniciales en MongoDB.

---

## 📡 Endpoints principales

### 🩺 Health check

| Método | Endpoint | Descripción |
| --- | --- | --- |
| GET | `/api/health` | Comprueba si la API está funcionando |

### 🔐 Autenticación

| Método | Endpoint | Protección | Descripción |
| --- | --- | --- | --- |
| POST | `/api/auth/register` | Pública | Registra un nuevo usuario |
| POST | `/api/auth/login` | Pública | Inicia sesión y devuelve un token JWT |
| GET | `/api/auth/me` | JWT | Devuelve el usuario autenticado |
| GET | `/api/auth/admin-test` | JWT + Admin | Ruta de prueba solo para administradores |

### 🥦 Perfil nutricional

| Método | Endpoint | Protección | Descripción |
| --- | --- | --- | --- |
| GET | `/api/nutrition-profile/me` | JWT | Obtiene el perfil nutricional del usuario |
| POST | `/api/nutrition-profile` | JWT | Crea un perfil nutricional |
| PUT | `/api/nutrition-profile` | JWT | Actualiza el perfil nutricional |

### 🍽️ Recetas

| Método | Endpoint | Protección | Descripción |
| --- | --- | --- | --- |
| GET | `/api/recipes` | Pública | Lista todas las recetas |
| GET | `/api/recipes/:id` | Pública | Obtiene una receta por ID |
| POST | `/api/recipes` | JWT + Admin | Crea una receta |
| PUT | `/api/recipes/:id` | JWT + Admin | Actualiza una receta |
| DELETE | `/api/recipes/:id` | JWT + Admin | Elimina una receta |

### ⭐ Favoritos

| Método | Endpoint | Protección | Descripción |
| --- | --- | --- | --- |
| GET | `/api/favorites` | JWT | Lista las recetas favoritas del usuario |
| POST | `/api/favorites/:recipeId` | JWT | Añade una receta a favoritos |
| DELETE | `/api/favorites/:recipeId` | JWT | Elimina una receta de favoritos |
| GET | `/api/favorites/check/:recipeId` | JWT | Comprueba si una receta está en favoritos |

### 📅 Plan semanal

| Método | Endpoint | Protección | Descripción |
| --- | --- | --- | --- |
| GET | `/api/weekly-plan` | JWT | Obtiene el plan semanal del usuario |
| POST | `/api/weekly-plan/:recipeId` | JWT | Añade una receta al plan semanal |
| DELETE | `/api/weekly-plan/:id` | JWT | Elimina una receta del plan semanal |

---

## 🔑 Autenticación con JWT

Para acceder a rutas protegidas, envía el token en el header `Authorization`:

```http
Authorization: Bearer TU_TOKEN_JWT
```

Ejemplo:

```bash
curl -H "Authorization: Bearer TU_TOKEN_JWT" \
  https://app-nutriplan-backend.onrender.com/api/auth/me
```

---

## ☁️ Despliegue

### 🚀 Render

El backend está desplegado en **Render**:

```txt
https://app-nutriplan-backend.onrender.com
```

Endpoint de comprobación:

```txt
https://app-nutriplan-backend.onrender.com/api/health
```

Configuración típica en Render:

- **Build Command:** `npm install`
- **Start Command:** `npm start`
- **Environment:** Node
- **Variables de entorno:** las mismas del archivo `.env`, configuradas desde el panel de Render.

### 📦 GitHub

Repositorio principal:

```txt
https://github.com/MarioMS2000/APP_NutriPlan_BackEnd/tree/main
```

Render puede conectarse al repositorio para desplegar automáticamente cuando haya cambios en la rama principal.

---

## 🧪 Probar la API

Puedes probar el endpoint de salud con:

```bash
curl https://app-nutriplan-backend.onrender.com/api/health
```

Respuesta esperada:

```json
{
  "ok": true,
  "message": "La API de NutriPlan está en funcionamiento"
}
```

---

## 🌍 CORS

La API permite peticiones desde:

- `http://localhost:5173`
- La URL definida en `FRONTEND_URL`

Esto permite trabajar en local con Vite u otro frontend y también conectar el frontend desplegado en producción.

---

## 👨‍💻 Autor

Proyecto desarrollado por **MarioMS2000** como parte del bootcamp.

---

## ✅ Estado del proyecto

API backend funcional con:

- ✅ Autenticación JWT
- ✅ Roles de usuario
- ✅ PostgreSQL conectado con Sequelize
- ✅ MongoDB conectado con Mongoose
- ✅ CRUD de recetas
- ✅ Favoritos
- ✅ Plan semanal
- ✅ Despliegue en Render
