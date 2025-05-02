import express from 'express';
import { registerUserController} from '../../controllers/Client/userController.js';

const userRouter = express.Router();

userRouter.post('/register', registerUserController);


export default userRouter;