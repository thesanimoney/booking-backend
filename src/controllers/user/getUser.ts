import {Request, Response} from "express";
import User from "../../models/user";
import {Error} from "mongoose";

export default async function getUser(req: Request, res: Response) {
    try {
        const {id} = req.body.user
        if (!id) return res.status(404).send("User not found")

        const user = await User.findById(id).select(['-password', '-__v'])
        if (!user) return res.status(404).send("User not found")

       return res.status(200).send(user)

    } catch (error) {
        if (error instanceof Error) return res.status(500).send(error.message);
    }
}