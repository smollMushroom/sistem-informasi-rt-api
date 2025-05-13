import { createBlacklistToken, deleteBlacklistedToken, findBlacklistedToken } from "../repositories/tokenBlacklistRepository"

export const addTokenToBlacklist = async (token: string, expiresAt: Date) => {
  await createBlacklistToken(token, expiresAt);
}

export const isTokenBlacklisted = async (token: string): Promise<boolean> => {
  const tokenInDb = await findBlacklistedToken(token || '');
  return !!tokenInDb;
}

export const cleanupExpiredTokens = async () => {
  const result = await deleteBlacklistedToken();
  console.log(`[CRON] Deleted ${result.count} expired tokens`);
}