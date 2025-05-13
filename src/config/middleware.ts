import cors, { CorsOptions } from 'cors';
import helmet from 'helmet';
import express, { Express } from 'express';

const corsConfig: CorsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

const urlencodedConfig = {
  extended: true,
  limit: '20mb'
};

export const setupMiddleware = (app: Express) => {
  app.use(express.json({limit: '20mb'}));
  app.use(cors(corsConfig));
  app.use(helmet());
  app.use(express.urlencoded(urlencodedConfig));
};
