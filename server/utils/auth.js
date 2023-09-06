import jwt from "jsonwebtoken";
import { genSalt, hash } from "bcrypt";

const maxAge = 3 * 24 * 60 * 60;

export const generatePassword = async (password) => {
  const salt = await genSalt();
  return await hash(password, salt);
};

export const createToken = async (email, userId) => {
  const token = jwt.sign({ email, userId }, process.env.JWT_KEY, {
    expiresIn: maxAge,
  });
  return token;
};
