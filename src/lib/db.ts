import { PrismaLibSql } from "@prisma/adapter-libsql"

import { databaseUrl } from "@/lib/db-url"
import { PrismaClient } from "@/generated/prisma/client"

declare global {
  var __prisma: PrismaClient | undefined
}

const adapter = new PrismaLibSql({ url: databaseUrl })

export const prisma = globalThis.__prisma ?? new PrismaClient({ adapter })

if (process.env.NODE_ENV !== "production") {
  globalThis.__prisma = prisma
}
