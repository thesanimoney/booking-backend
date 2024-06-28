import dotenv from "dotenv";
dotenv.config();

export const DB_CONNECTION = process.env.DB_CONNECTION!;
export const SECRET_KEY = process.env.SECRET_KEY!;