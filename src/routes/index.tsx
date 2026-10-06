import TodosTable from "@/components/todo-table"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { prisma } from "@/lib/db"
import { createFileRoute, Link } from "@tanstack/react-router"
import { createServerFn } from "@tanstack/react-start"
import { PlusIcon } from "lucide-react"

const getTodos = createServerFn().handler(() => {
  return prisma.todo.findMany()
})
export const Route = createFileRoute("/")({
  component: App,
  loader: () => getTodos(),
})

function App() {
  const todos = Route.useLoaderData()

  const totalCount = todos.length
  const completeCount = todos.filter((todo) => todo.completed).length
  return (
    <div className="space-y-8">
      <section id="header">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold">Todo List</h1>
            {totalCount > 0 && (
              <Badge variant="outline" className="px-5">
                {completeCount} of {totalCount} Completed
              </Badge>
            )}
          </div>
          <Link to="/todos/new" className={buttonVariants({})}>
            <PlusIcon />
            Add Todo
          </Link>
        </div>
      </section>
      <section id="search">
        <Input />
        <Button>Search</Button>
      </section>
      <section id="todoList">
        <TodosTable todos={todos} />
      </section>
    </div>
  )
}
