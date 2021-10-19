import upload from '@config/upload';
import '@shared/container';
import AppError from '@shared/errors/AppError';
import '@shared/infra/typeorm';
import { errors } from 'celebrate';
import cors from 'cors';
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import 'reflect-metadata';
import { pagination } from 'typeorm-pagination';
import rateLimiter from './middlewares/rateLimiter';
import routes from './routes';

const app = express();

const PORT = process.env.PORT || 4000;

// Safe
app.use(rateLimiter);
app.use(cors());
app.use(express.json());
// Pagination
app.use(pagination);
// static files
app.use('/files', express.static(upload.directory));

// Routes
app.use('/v1', routes);

app.use(errors());
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
      status: 'error',
    });
  }

  console.log(`error`, error);
  return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
});

app.listen(PORT, () => {
  console.log(`[Server]: Running on port: ${PORT}`);
});
