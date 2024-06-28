import {Request, Response} from 'express';
import findUser from "../../services/db/user/findUser";
import checkPassword from "../../services/password/checkPassword";
import generateJWT from "../../services/jwt/generateJWT";
import User from "../../models/user";

const login = async (req: Request, res: Response) => {
    const {username, password} = req.body
    try {
        const user = await User.findOne({username: username})

        const isCorrectPassword = await checkPassword(password, user!.password)
        if (!isCorrectPassword) return res.status(401).send("Password is incorrect")

        const jwt = generateJWT({username: username, email: user!.email, id: user!.id})
        return res.status(200).header("x-auth-token", jwt).send(user)

    } catch (e) {
        if (e instanceof Error) return res.status(500).send(e.message)
    }
}

export default login