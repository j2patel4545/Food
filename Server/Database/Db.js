import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const DatabaseConnection = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/Food_Testing");
        console.log("Database Connected Successfully");
    } catch (error) {
        console.error("Database Connection Failed..!", error);
        throw error;
    }
};

export default DatabaseConnection;
