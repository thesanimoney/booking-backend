import jwt from "jsonwebtoken";
import {SECRET_KEY} from "../../config/config";

export default function generateJWT(payload: any): string {
    try {
        return jwt.sign(payload, SECRET_KEY);
    } catch (error) {
        throw new Error("Error generating JWT " + error);
    }
}
