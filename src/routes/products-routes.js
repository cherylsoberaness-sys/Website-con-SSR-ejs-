import express from 'express';
import {  productController, productsController, newProductController, getProductController, editProductController } from '../controllers/products-controllers.js';

export const productsRouter = express.Router();

productsRouter.get('/', productsController);

productsRouter.get('/newproduct', productController);
productsRouter.post('/', newProductController);

//productsRouter.get('/:productId', delteProductController);

productsRouter.get('/:productId', getProductController);
productsRouter.post('/edit/:productId', editProductController);


