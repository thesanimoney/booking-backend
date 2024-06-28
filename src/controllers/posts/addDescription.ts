import { Request, Response } from "express";
import User from "../../models/user";
import postDetailsValidation from "../../services/validation/postDetailsValidation";
import PostDetails from "../../models/postDetails";

const AddDescription = async (req: Request, res: Response) => {
    const {user, ...newObject} = req.body
    if (!user.id) return res.status(400).send('You can\'\t add description, please login')

    try {
        const publisher = await User.findById(user.id)
        if (!publisher) return res.status(400).send('You can\'\t add description, please login')

        const {value, error} = postDetailsValidation(newObject)
        if (error) return res.status(400).send(error.message);

        const newDescription = new PostDetails({
            ...value
        })

        await newDescription.save()
        return res.status(200).send(newDescription)
    } catch (e) {
        return res.status(500).send(e)
    }
}

export default AddDescription;