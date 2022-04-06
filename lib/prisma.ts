import { Prisma, PrismaClient } from '@prisma/client';

// Prevent multiple instances of Prisma Client in development
declare const global: typeof globalThis & { prisma?: PrismaClient };

export const prisma: PrismaClient<
  Prisma.PrismaClientOptions,
  never,
  Prisma.RejectOnNotFound | Prisma.RejectPerOperation
> = global.prisma || new PrismaClient();
if (process.env.NODE_ENV === 'development') global.prisma = prisma;
