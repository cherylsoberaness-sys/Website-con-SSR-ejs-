import express from 'express';
import { loginActionController, loginPageController, logoutActionController } from '../controllers/auth-controller.js';

export const authRouter = express.Router();

authRouter.get("/login", loginPageController);

authRouter.post('/login', loginActionController);

authRouter.get('/logout', logoutActionController);