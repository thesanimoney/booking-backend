import User from "../../../models/user";
import {Response} from "express";

export default async function findUser(id: string, res: Response) {
        const user = await User.findById(id)
        if (!user) return null;
        return user
    }