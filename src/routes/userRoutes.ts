import express from 'express';
import { createUser, deleteUser, getUserByEmailOrUsername, getUsers, updateUser, whoAmI } from '../controllers/userController';
import { authenticateJWT } from '../middleware/authenticateJWT';
import { authorizeRoles } from '../middleware/authorizeRoles';
import { roles } from '../config/roles';
import { validate } from '../middleware/validate';
import { createUserSchema } from '../validators/user/createUserSchema';

const router = express.Router();

router.get('/', authenticateJWT, authorizeRoles(...roles.pengurus), getUsers);
router.get('/detail', authenticateJWT, authorizeRoles(...roles.pengurus), getUserByEmailOrUsername);
router.post('/admin/create', authenticateJWT, authorizeRoles(...roles.pemimpin), createUser);
router.delete('/delete/:id', authenticateJWT, authorizeRoles(...roles.pengurus), deleteUser)
router.get('/whoAmI', authenticateJWT, whoAmI);
router.put('/update/:id', authenticateJWT,  updateUser)
router.post('/create',validate(createUserSchema) , createUser);

export default router;
