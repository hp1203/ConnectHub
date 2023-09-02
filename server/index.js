import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";

configDotenv({ path: "./config.env"});

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});

