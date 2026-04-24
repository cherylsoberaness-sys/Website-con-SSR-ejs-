import express from 'express';

export const utilitiesRouter = express.Router();

utilitiesRouter.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        date: new Date().toISOString(),
    });
});