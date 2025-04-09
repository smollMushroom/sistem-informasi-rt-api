import cors, { CorsOptions } from 'cors';
import helmet from 'helmet';
import express, { Express } from 'express';

const corsConfig: CorsOptions = {
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

const urlencodedConfig = {
  extended: true,
  limit: '1mb',
  parameterLimit: 5000,
};

export const setupMiddleware = (app: Express) => {
  app.use(express.json());
  app.use(cors(corsConfig));
  app.use(helmet());
  app.use(express.urlencoded(urlencodedConfig));
};
