import express from 'express';
import { verifyToken } from '../middleware/auth.middleware';
import { getMessages, getUsersForSideBar, sendMessages } from '../controllers/message.controller';

const router = express.Router();

router.get("/users", verifyToken, getUsersForSideBar);
router.get("/:id", verifyToken, getMessages);
router.get("/send/:id", verifyToken, sendMessages);

export default router;
