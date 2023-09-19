import Category from "../models/category.model.js";
import { connectToDb } from "../utils/database.js";

export const getCategories = async (request, response) => {
  connectToDb();
  try {
    const categories = await Category.find({});
    return response.status(200).json({
      categories,
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error: error.message });
  }
};
