import { Response } from "express";

const handleError = (res: Response, error: Error) => {
    if (error.message.includes("ValidationError")) {
        return res.status(400).send(error.message);
    }
    return res.status(500).send(error.message);
};

export default handleError;
