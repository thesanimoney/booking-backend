import {Request, Response} from 'express';
import userValidation from "../../services/validation/userValidation";
import hashPassword from "../../services/password/hashPassword";
import addUser from "../../services/db/user/addUser";
import User from "../../models/user";
import generateJWT from "../../services/jwt/generateJWT";

const register = async (req: Request, res: Response) => {
    const {value, error} = userValidation(req.body)
    if (error) return res.status(400).send(error.message)

    const user = await User.findOne({username: value.username})
    if (user) return res.status(400).send("Username is already registered")

    try {
        const hashedPassword = await hashPassword(value.password)
        const newUser = await addUser(value, hashedPassword)

        const jwt = generateJWT({username: newUser!.username, email: newUser!.email, id: newUser!._id})

        return res.status(200).header("x-auth-token", jwt).send(newUser)

    } catch (e) {
        if (e instanceof Error) {
            res.status(400).send(e.message)
        }
    }
}

export default register