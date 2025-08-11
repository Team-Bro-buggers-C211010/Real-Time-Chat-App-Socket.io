import express from 'express';
import { verifyToken } from '../middleware/auth.middleware.js';
import { getLastMessages, getMessages, sendMessages } from '../controllers/message.controller.js';

const router = express.Router();

router.get("/last/messages", verifyToken, getLastMessages);
router.get("/:id", verifyToken, getMessages);
router.post("/send/:id", verifyToken, sendMessages);

export default router;
