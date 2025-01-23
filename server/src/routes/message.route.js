import express from 'express';
import { verifyToken } from '../middleware/auth.middleware';
import { getUsersForSideBar } from '../controllers/message.controller';

const router = express.Router();

router.get("/users", verifyToken, getUsersForSideBar);
router.get("/:id", verifyToken, getMessages);

export default router;
