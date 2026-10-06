import TodoForm from "@/components/todo-form"
import { prisma } from "@/lib/db"
import { getTodoByIdSchema } from "@/schema/todo"
import { createFileRoute, notFound } from "@tanstack/react-router"
import { createServerFn } from "@tanstack/react-start"

const loadData = createServerFn()
  .validator(getTodoByIdSchema)
  .handler(async ({ data }) => {
    const todo = await prisma.todo.findUnique({
      where: { id: data.id },
      select: { id: true, title: true, createdAt: true, completed: true },
    })
    if (!todo) {
      throw notFound()
    }
    return todo
  })
export const Route = createFileRoute("/todos/$id/edit/")({
  component: RouteComponent,
  loader: ({ params }) => loadData({ data: params }),
})

function RouteComponent() {
  const todo = Route.useLoaderData()
  return (
    <div className="space-y-6 p-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Edit Todo</h1>
        <p className="text-muted-foreground">Edit a new todo item</p>
      </div>
      <TodoForm todo={todo} />
    </div>
  )
}
