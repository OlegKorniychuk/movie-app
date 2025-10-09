import express from 'express';
import indexRouter from './router';

const app = express();
app.use(express.json());

app.use('/api/v1', indexRouter);

export default app;
