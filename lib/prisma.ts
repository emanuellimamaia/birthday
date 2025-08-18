import { PrismaClient } from './generated/prisma'

// Cria uma nova instância do PrismaClient
export const prisma = new PrismaClient({
  log: ['error'],
})

// Para debugging
console.log('Prisma Client methods:', Object.getOwnPropertyNames(prisma))
