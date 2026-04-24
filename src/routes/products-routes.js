import express from 'express';
import {  productsController } from '../controllers/products-controllers.js';

export const productsRouter = express.Router();

productsRouter.get('/', productsController);


