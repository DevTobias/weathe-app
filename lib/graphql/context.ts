import { PrismaClient } from '@prisma/client';
import { prisma } from '@Lib/prisma';

export type Context = {
  prisma: PrismaClient;
};

/**
 * Creates the context for the graphQL apollo server.
 */
export const createContext = async (): Promise<Context> => {
  return { prisma };
};
