import { Router } from 'express';
import welcomeController from '../../controllers/welcomeController.js';

const router = Router();
router.get('/', welcomeController.welcome);
export default router;
