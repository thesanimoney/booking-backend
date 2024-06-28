import { NextFunction, Request, Response } from "express";
import {SECRET_KEY} from "../config/config";
import jwt from "jsonwebtoken";

export default function auth(req: Request, res: Response, next: NextFunction) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access Denied. Token not found');

    try {
        req.body.user = jwt.verify(token, SECRET_KEY)
        next()
    } catch (ex) {
        if (ex instanceof Error) {
            res.status(404).send("Invalid token");
        }
    }
}