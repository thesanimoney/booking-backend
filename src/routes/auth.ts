import express from "express";
import login from "../controllers/auth/login";
import register from "../controllers/auth/register";

const router = express.Router();

router.post('/login', login)
router.post('/register', register)

export default router;