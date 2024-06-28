import bcrypt from "bcrypt";
import {Error} from "mongoose";

export default async function checkPassword(password: string, hashedPassword: string) {
    try {
        return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
        if (error instanceof Error) throw new Error(error.message);
    }
}
