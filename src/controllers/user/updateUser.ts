import { Request, Response } from "express";
import User from "../../models/user";
import userValidation from "../../services/validation/userValidation";

export default async function updateUser(req: Request, res: Response) {
    const { user } = req.body;
    if (!user.id) return res.status(400).send('ID not found');

    try {
        const existingUser = await User.findById(user.id);
        const duplicateUser = await User.findOne({username: req.body.username});

        if (duplicateUser) return res.status(400).send('This username already exists')
        if (!existingUser) return res.status(404).send('User not found');

        const newUserData = { ...existingUser.toObject(), username: req.body.username};
        const { value, error } = userValidation(newUserData);

        if (error) return res.status(400).send(error.details[0].message);
        const updatedUser = await User.findByIdAndUpdate(user.id, value, { new: true });

        if (!updatedUser) return res.status(404).send('User not found after update');

        res.send(duplicateUser);
    } catch (err) {
        res.status(500).send('An error occurred while updating the user.');
    }
}
