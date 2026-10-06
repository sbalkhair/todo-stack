import {
  deleteTodoSchema,
  selectTodoByIdSchema,
  type Todo,
} from "@/schema/todo"

import { prisma } from "@/lib/db"
import { Link, useRouter } from "@tanstack/react-router"
import { createServerFn } from "@tanstack/react-start"
import { EditIcon, InboxIcon, Trash2Icon } from "lucide-react"
import { useState } from "react"
import { Button } from "./ui/button"
import { Checkbox } from "./ui/checkbox"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table"

interface TodosProp {
  todos: Todo[]
}
const deleteTodo = createServerFn({ method: "POST" })
  .validator(deleteTodoSchema)
  .handler(async ({ data }) => {
    await prisma.todo.delete({ where: { id: data.id } })
  })

const toggleTodo = createServerFn({ method: "POST" })
  .validator(selectTodoByIdSchema)
  .handler(async ({ data }) => {
    const todo = await prisma.todo.findUnique({ where: { id: data.id } })
    await prisma.todo.update({
      data: { ...data, completed: !todo?.completed },
      where: { id: data.id },
    })
  })
const TodosTable = ({ todos }: TodosProp) => {
  if (todos.length === 0) {
    return (
      <div>
        <div className="flex flex-col items-center justify-center gap-2 py-12">
          <InboxIcon className="h-12 w-12 text-muted-foreground" />
          <h3 className="text-lg font-semibold">Add new todo to see it here</h3>
        </div>
      </div>
    )
  }
  return (
    <div>
      <Table>
        <TableHeader className="uppercase">
          <TableRow className="bg-black/10 dark:bg-white/10">
            <TableHead></TableHead>
            <TableHead>Task</TableHead>
            <TableHead>Created On</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {todos.map((todo) => (
            <TodoTableRow key={todo.id} todo={todo} />
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default TodosTable

const TodoTableRow = ({ todo }: { todo: Todo }) => {
  const router = useRouter()
  const [isCurrentComplete, setIsCurrentComplete] = useState(todo.completed)
  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-2">
          <Checkbox
            checked={isCurrentComplete}
            onClick={() => {
              setIsCurrentComplete(!todo.completed)
              toggleTodo({
                data: { id: todo.id, completed: !isCurrentComplete },
              })
              router.invalidate()
            }}
          />
        </div>
      </TableCell>

      <TableCell
        className={`${todo.completed && "text-muted-foreground line-through"}`}
      >
        {todo.title}
      </TableCell>
      <TableCell>{todo.createdAt.toLocaleDateString()}</TableCell>
      <TableCell className="flex w-fit gap-2">
        <Link to="/todos/$id/edit" params={{ id: todo.id }}>
          <div className="w-fit rounded-lg bg-green-100 p-2 text-green-500 dark:bg-green-100/10">
            <EditIcon className="size-4" />
          </div>
        </Link>

        <Button
          variant="link"
          onClick={async () => {
            await deleteTodo({ data: { id: todo.id } })
            router.invalidate()
          }}
        >
          <div className="w-fit rounded-lg bg-red-100 p-2 text-red-500 dark:bg-red-100/10">
            <Trash2Icon className="size-4" />
          </div>
        </Button>
      </TableCell>
    </TableRow>
  )
}
