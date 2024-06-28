import express from "express";
import postsRouter from "./posts";
import authRouter from "./auth";
import userRouter from "./users";

export const router = express.Router();
router.use("/api/posts", postsRouter);
router.use("/api", authRouter);
router.use("/api/user", userRouter);
