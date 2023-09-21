import { connectToDb } from "../utils/database.js";
import User from "../models/user.model.js";
import { createToken, generatePassword } from "../utils/auth.js";
import { compare } from "bcrypt";

export const register = async (request, response) => {
  connectToDb();
  try {
    const { name, email, password } = request.body;

    if (!name)
      return response.status(400).json({ error: "name is required" });
    if (!email)
      return response.status(400).json({ error: "email is required" });
    if (!password)
      return response.status(400).json({ error: "password is required" });

    const existingUser = await User.findOne({
      email: email,
    });

    if (!existingUser) {
      const registeredUser = await User.create({
        name: name,
        email: email,
        password: await generatePassword(password),
      });
      const token = await createToken(email, registeredUser._id.toString());
      return response.status(201).json({
        user: registeredUser,
        token: token,
      });
    } else {
      return response.status(400).json({ error: "User already exist" });
    }
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error: error.message });
  }
};

export const login = async (request, response) => {
  connectToDb();
  try {
    const { email, password } = request.body;

    if (!email)
      return response.status(400).json({ error: "email is required" });
    if (!password)
      return response.status(400).json({ error: "password is required" });

    const user = await User.findOne({
      email,
    });

    if (!user)
      return response.status(400).json({ error: "User not found" });

    const auth = await compare(password, user.password);

    if (!auth) return response.status(400).json({ error: "Invalid Password" });

    const token = await createToken(user.email, user._id.toString());
    return response.status(201).json({
      user: user,
      token: token,
    });
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
};
