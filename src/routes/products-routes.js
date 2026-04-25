import express from 'express';
import {  productController, productsController, newProductController } from '../controllers/products-controllers.js';

export const productsRouter = express.Router();

productsRouter.get('/', productsController);

productsRouter.get('/newproduct', productController);

productsRouter.post('/newproduct', newProductController);
