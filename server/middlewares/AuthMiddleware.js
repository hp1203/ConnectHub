import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";

configDotenv({ path: "./config.env" });

export const verifyToken = (request, response, next) => {
  const authorizationHeader = request.headers["authorization"];
  const token = authorizationHeader.split(" ")[1];
  if (!token) return response.status(401).send("You are not authenticated");
  jwt.verify(token, process.env.JWT_KEY, async (error, payload) => {
    if (error) return response.status(403).send("Token is not valid");
    response.userId = payload?.userId;
    response.email = payload?.email;
    next();
  });
};
