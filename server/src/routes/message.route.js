import express from 'express';
import { verifyToken } from '../middleware/auth.middleware.js';
import { getMessages, getUsersForSideBar, sendMessages } from '../controllers/message.controller.js';

const router = express.Router();

router.get("/users", verifyToken, getUsersForSideBar);
router.get("/:id", verifyToken, getMessages);
router.post("/send/:id", verifyToken, sendMessages);

export default router;
