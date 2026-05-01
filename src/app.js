import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import morgan from 'morgan';
import ejs from 'ejs';

import { utilitiesRouter } from './routes/utilities-router.js';
import { pagesRouter } from './routes/pages-routes.js';
import { productsRouter } from './routes/products-routes.js';
import { authRouter } from './routes/auth-router.js';

import { guard, sessionInviews, sessionMiddleware } from './middleware/auth-middleware.js';


//inicializamos la app de express:
const app = express();
const appDir = dirname(fileURLToPath(import.meta.url)); 

//Global middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(appDir, '../public')));
app.use(morgan('tiny'));

app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store');
    next();
});

//Auth middlewares
app.use(sessionMiddleware);
app.use(sessionInviews);

// Configuración del motor de plantillas
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);
app.set('views', join(appDir, 'views'));

app.use('/', pagesRouter);
app.use('/', utilitiesRouter);
app.use('/', authRouter);
app.use('/products', guard, productsRouter);

app.use((req, res) => {
    res.status(404).send('Resource not found');
});

app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send(err.message || 'Something failed!');
});


export default app;