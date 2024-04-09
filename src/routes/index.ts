import { Router } from 'express';
import userRoute from './users';

const router: Router = Router();

router.use('/users', userRoute);

export default router;
