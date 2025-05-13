import express from 'express';
import dotenv from 'dotenv';
import routes from './routes';
import { errorHandler } from './middleware/errorHandler';
import { setupGracefulShutdown } from './utils/gracefulShutdown';
import { setupMiddleware } from './config/middleware';
import { scheduleTokenCleanup } from './utils/cleanupExpiredTokens';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

setupMiddleware(app);
scheduleTokenCleanup()

app.use('/v1', routes);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`[Server] berjalan di http://localhost:${port}`);
});

setupGracefulShutdown();