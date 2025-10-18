import express from 'express';
import morgan from 'morgan';
import { dbRoute } from './dbroutes/routes.js';

export function createApp(){
    const app = express();
    app.use(express.json());
    app.use(morgan('dev'));
    app.use('/api', dbRoute);

    return app;

}