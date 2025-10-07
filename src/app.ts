import express from 'express';
import indexRouter from './router';

const app = express();

app.use('/api/v1', indexRouter);

export default app;
