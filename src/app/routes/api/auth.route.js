import { Router } from 'express';
import authController from '../../controllers/authController.js';
import checkUserExists from '../../middlewares/userExist.js';
import userSchema from '../../validators/schemas/user.schemas.js';
import validator from '../../middlewares/validator.js';

//routes
const router = Router();
router.post('/signup', validator(userSchema),checkUserExists, authController.signup);
router.post('/login', authController.login);
router.get('/', authController.getAllUsers);
router.get('/:userId', authController.getUser); 
router.delete('/:userId', authController.deleteUser);
export default router;
