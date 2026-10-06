import path from "node:path"

export const databaseUrl =
  process.env.DATABASE_URL ??
  `file:${path.join(process.cwd(), "prisma", "dev.db")}`
