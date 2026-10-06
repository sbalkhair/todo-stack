# TanStack Start + shadcn/ui

This is a template for a new TanStack Start project with React, TypeScript, and shadcn/ui.

## Adding components

To add components to your app, run the following command:

```bash
npx shadcn@latest add button
```

This will place the ui components in the `components` directory.

## Using components

To use the components in your app, import them as follows:

```tsx
import { Button } from "@/components/ui/button";
```

## Database

Prisma ORM 7 with SQLite. The database is a local file at `prisma/dev.db`, and the
schema lives in `prisma/schema.prisma`. Set `DATABASE_URL` to point somewhere
else (e.g. Turso) and it overrides the default file path.

| Command                | Description                                     |
| ---------------------- | ----------------------------------------------- |
| `bun run db:migrate`   | Create and apply a migration (`-- --name <name>`) |
| `bun run db:generate`  | Regenerate the client after editing the schema  |
| `bun run db:push`      | Sync the schema without a migration             |
| `bun run db:studio`    | Browse the data in Prisma Studio                |

The client is a singleton in `src/lib/db.ts`. Import it inside server functions
only, so it stays out of the browser bundle:

```ts
import { createServerFn } from "@tanstack/react-start";
import { prisma } from "@/lib/db";

const getTodos = createServerFn({ method: "GET" }).handler(async () => {
  return prisma.todo.findMany();
});
```

Generated client code is written to `src/generated/prisma` and is gitignored.
