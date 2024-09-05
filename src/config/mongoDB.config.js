import mongoose from "mongoose";
import config from "./env.config.js";
export const connectMongoDB = async () => {
  try {
    await mongoose.connect(config.MONGO_URL, {
      dbName: config.DB_NAME,
    });
    console.log("DB conectada...!!!");
  } catch (error) {
    console.log(`Error al conectar a DB: ${error}`);
  }
};
connectMongoDB();
