import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const ConnectDB = async (req, res)=>{
    try {
        await mongoose.connect(process.env.MONGO_DB_URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database connected successfully");
    } catch (error) {
       console.log("Database connection failed", error);
       
    }
}