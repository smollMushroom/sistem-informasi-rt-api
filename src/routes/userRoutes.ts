import express from 'express';
import { createUser, getUserByEmailOrUsername, getUsers, whoAmI } from '../controllers/userController';
import { authenticateJWT } from '../middleware/authenticateJWT';
import { authorizeRoles } from '../middleware/authorizeRoles';
import { roles } from '../config/roles';

const router = express.Router();

router.get('/', authenticateJWT, authorizeRoles(...roles.pengurus), getUsers);
router.get('/detail', authenticateJWT, authorizeRoles(...roles.pengurus), getUserByEmailOrUsername);
router.post('/admin/create', authenticateJWT, authorizeRoles(...roles.pemimpin), createUser);
router.get('/whoAmI', authenticateJWT, whoAmI);
router.post('/create', createUser);

export default router;
