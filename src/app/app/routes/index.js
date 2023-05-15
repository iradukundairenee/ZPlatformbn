import { Router } from 'express';
import welcomeRoutes from './welcome.routes';

const router = Router();
router.use('/welcome', welcomeRoutes);
export default router;
