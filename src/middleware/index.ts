import cors from "cors";
import express, {Express} from "express";
import {router} from "../routes";
import helmet from "helmet";

const corsOptions = {
    exposedHeaders: ['x-auth-token'],
};

export default function runMiddlewares(app: Express) {
    app.use(helmet());
    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(router)
}