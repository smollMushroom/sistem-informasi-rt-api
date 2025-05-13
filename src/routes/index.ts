import express from 'express';
import userRoutes from './userRoutes';
import authRoutes from './authRoutes';
import postRoutes from './postRoutes'
import letterRequestRoutes from './letterRequestRoutes'

const router = express.Router();

router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/posts', postRoutes);
router.use('/letter', letterRequestRoutes)

export default router;
