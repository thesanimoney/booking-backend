import User, {UserInterface} from "../../../models/user";

export default async function addUser(user: UserInterface, hashedPassword: string) {
    try {
        const newUser = new User({
            ...user, password: hashedPassword
        })
        return await newUser.save()

    } catch (error) {
        if (error instanceof Error) {
             throw new Error(`Error adding user: ${error.message}`);
        }
    }
}