import express from 'express';
import { createLetterRequestController, deleteLetterRequestController, getAllLetterRequestsController, getLetterRequestByIdController, updateLetterRequestController } from '../controllers/letterRequestController';
import { authenticateJWT } from '../middleware/authenticateJWT';
import { validate } from '../middleware/validate';
import { createLetterRequestSchema } from '../validators/letterRequest/createLetterRequestSchema';
import { updateLetterRequestSchema } from '../validators/letterRequest/updateLetterRequestSchema';

const router = express.Router();

router.get('/', authenticateJWT, getAllLetterRequestsController);
router.get('/:id', authenticateJWT, getLetterRequestByIdController);
router.post('/', authenticateJWT, validate(createLetterRequestSchema), createLetterRequestController);
router.put('/:id', authenticateJWT, validate(updateLetterRequestSchema), updateLetterRequestController);
router.delete('/:id', authenticateJWT, deleteLetterRequestController);

export default router;