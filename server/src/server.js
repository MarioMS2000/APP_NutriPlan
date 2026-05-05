import dotenv from "dotenv";
import app from "./app.js";

dotenv.config(); // Le dice a Node que lea el archivo .env y meta esas variables en memoria para poder usarlas en la app

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});