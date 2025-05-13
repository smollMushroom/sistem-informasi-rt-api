import express from 'express';
import { createPost, deletePost, getPost, getPosts, updatePost } from '../controllers/postController';
import { validate } from '../middleware/validate';
import { createPostSchema } from '../validators/post/createPostSchema';
import { authenticateJWT } from '../middleware/authenticateJWT';
import { authorizeRoles } from '../middleware/authorizeRoles';
import { roles } from '../config/roles';
import { updatePostSchema } from '../validators/post/updatePostShema';

const router = express.Router();

//public
router.get('/', getPosts)
router.get('/detail', getPost)

//admin
router.post('/', validate(createPostSchema), authenticateJWT, authorizeRoles(...roles.pengurus), createPost)
router.put('/:id', validate(updatePostSchema), authenticateJWT, authorizeRoles(...roles.pengurus), updatePost)
router.delete('/:id', authenticateJWT, authorizeRoles(...roles.pengurus), deletePost)

export default router;