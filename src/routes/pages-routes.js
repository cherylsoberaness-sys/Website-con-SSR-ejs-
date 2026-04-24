import express from 'express';
import { homePageController } from '../controllers/pages-controllers.js';

export const pagesRouter = express.Router();


pagesRouter.get("/", homePageController);

pagesRouter.get("/about", (req, res, next) => {
    res.send('Need help? Contact us');
});

