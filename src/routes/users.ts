import express from "express";
import updateUser from "../controllers/user/updateUser";
import auth from "../middleware/auth";
import getUser from "../controllers/user/getUser";

const router = express.Router();

router.put('', auth, updateUser);
router.get('', auth, getUser);

export default router;