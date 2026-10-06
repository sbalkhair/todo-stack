import TodoForm from "@/components/todo-form"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/todos/new/")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="space-y-6 p-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Add Todo</h1>
        <p className="text-muted-foreground">Create a new todo item</p>
      </div>
      <TodoForm />
    </div>
  )
}
