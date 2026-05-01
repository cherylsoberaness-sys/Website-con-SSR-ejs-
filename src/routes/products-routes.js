import express from 'express';
import {  createProductController, productsController, newProductController, getProductController, editProductController, deleteProductController } from '../controllers/products-controllers.js';

export const productsRouter = express.Router();

productsRouter.get('/', productsController);

productsRouter.get('/newproduct', newProductController);
productsRouter.post('/', createProductController);

//productsRouter.get('/:productId', delteProductController);

productsRouter.get('/:productId', getProductController);
productsRouter.post('/edit/:productId', editProductController);

productsRouter.delete('/:productId', deleteProductController);


