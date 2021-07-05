import dotenv from 'dotenv';
import {HttpError} from 'http-errors';
import express, {NextFunction, Request, Response} from 'express';
import wordCountRouter from './routes/urlProcessor';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());
app.use((error: HttpError, req: Request, res: Response, next: NextFunction) => {
  const status = error.status || 500;
  const message = error.message || 'Internal Server Error';

  res.status(status).json({
    error: message,
  });
});

app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'RUNNING',
  });
});

app.use('/api/word-count', wordCountRouter);

export default app;
