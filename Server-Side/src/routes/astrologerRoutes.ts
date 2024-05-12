import express from 'express';
import { registerAstrologer, getAllAstrologers, editAstrologer } from '../controllers/astrologerController';

const router = express.Router();

router.post('/register', registerAstrologer);
router.get('/', getAllAstrologers);
router.put('/:id', editAstrologer);

export default router;
