import express from 'express';
import indexRouter from './router';
import { errorHandler } from './core/middleware/errorHandler';

const app = express();
app.use(express.json());

app.use('/api/v1', indexRouter);

app.use(errorHandler);

export default app;
