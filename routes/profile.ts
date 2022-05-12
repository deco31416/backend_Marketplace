import { Router } from 'express';
import { getUserData, putUserData } from '../controllers/profile';
import verifyToken from '../routes/middlewares/validate';

const router = Router();

router.get('/:id', verifyToken, getUserData );
router.put('/:id', verifyToken, putUserData );

export default router;