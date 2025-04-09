import cron from 'node-cron';
import { cleanupExpiredTokens } from '../services/tokenBlacklistService';

export const scheduleTokenCleanup = () => {
  cron.schedule('0 2 * * *', async () => {
    await cleanupExpiredTokens();
  })
}