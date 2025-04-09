import { prisma } from "../config/database"

export const createBlacklistToken = async (token: string, expiresAt: Date) => {
  return prisma.blacklistedToken.create({
    data: { token, expiresAt }
  });
};

export const findBlacklistedToken = async (token: string) => {
  return prisma.blacklistedToken.findUnique({
    where: { token }
  })
};

export const deleteBlacklistedToken = async () => {
  return prisma.blacklistedToken.deleteMany({
    where: {
      expiresAt: { lt: new Date() },
    },
  });
};
