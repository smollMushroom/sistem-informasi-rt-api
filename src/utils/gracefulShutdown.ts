import { prisma } from '../config/database';

export const setupGracefulShutdown = () => {
  const shutdownHandler = async (signal: string) => {
    console.log(`Received ${signal}. Shutting down server gracefully...`);
    await prisma.$disconnect();
    process.exit(0);
  };

  process.on('SIGINT', () => shutdownHandler('SIGINT'));
  process.on('SIGTERM', () => shutdownHandler('SIGTERM'));
};
