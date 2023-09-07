import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectToDb } from "./utils/database.js";
import authRoute from "./routes/AuthRouter.js";
import userRoutes from "./routes/UserRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: [process.env.ORIGIN],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
  connectToDb();
});
