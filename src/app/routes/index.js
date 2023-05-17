import { Router } from 'express';
import welcomeRoutes from './api/welcome.routes.js';
import Signup from './api/auth.route.js'


const router = Router();
router.use('/welcome', welcomeRoutes);
router.use('/users', Signup);


export default router;
