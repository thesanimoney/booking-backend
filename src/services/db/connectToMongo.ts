import mongoose from "mongoose";
import { DB_CONNECTION } from "../../config/config";

const connectToMongo = async () => {
    try {
        await mongoose.connect(DB_CONNECTION);
        console.log("Connected to MongoDB...");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

export default connectToMongo;
