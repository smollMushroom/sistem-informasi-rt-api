import express from 'express';
import { login, logout } from '../controllers/authController';
import { authenticateJWT } from '../middleware/authenticateJWT';
const router = express.Router();

router.post('/login', login);
router.post('/logout', authenticateJWT, logout)

export default router;
