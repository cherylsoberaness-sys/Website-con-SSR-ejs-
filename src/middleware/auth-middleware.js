import session from "express-session";
import ConnectMongo from 'connect-mongo';


export function guard(req, res, next) {
    const redirectUrl = '/login?redirect=' + encodeURIComponent(req.originalUrl);
    if (!req.session.userId) {
        // No hay login
        res.redirect(redirectUrl);
        return;
    }
    next();
}

const INACTIVITY_2_DAYS = 1000 * 60 * 60 * 24 * 2;

export const sessionMiddleware = session ({
    name: 'nodepop',
    secret: process.env.SESSION_SECRET || 'secret',
    saveUninitialized: true,
    resave: true,
    cookie: {
        maxAge: INACTIVITY_2_DAYS,
    },
    store: ConnectMongo.create({
        mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost:27017',
    })
})

export function sessionInviews(req, res, next) {
    res.locals.session = req.session;
    next();
}