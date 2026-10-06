import { prisma } from "@/lib/db"
import { createTodoSchema, editTodoSchema, type Todo } from "@/schema/todo"
import { useForm } from "@tanstack/react-form"
import { useNavigate } from "@tanstack/react-router"
import { createServerFn } from "@tanstack/react-start"
import { randomUUID } from "crypto"
import { Button } from "./ui/button"
import { Field, FieldContent, FieldError, FieldLabel } from "./ui/field"
import { Input } from "./ui/input"

const addToTodo = createServerFn()
  .validator(createTodoSchema)
  .handler(async ({ data }) => {
    return await prisma.todo.create({
      data: {
        id: randomUUID(),
        ...data,
      },
    })
  })

const editTodo = createServerFn()
  .validator(editTodoSchema)
  .handler(async ({ data }) => {
    console.log(data)
    return prisma.todo.update({
      data: {
        ...data,
      },
      where: { id: data.id },
    })
  })

const TodoForm = ({ todo }: { todo?: Todo }) => {
  const navigate = useNavigate()
  const form = useForm({
    defaultValues: {
      title: todo?.title ?? "",
    },
    validators: {
      onChange: createTodoSchema,
    },
    onSubmit: async ({ value }) => {
      todo
        ? await editTodo({ data: { id: todo.id, title: value.title } })
        : await addToTodo({ data: value })

      navigate({ to: "/" })
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
      className="space-y-4"
    >
      <form.Field
        name="title"
        children={(field) => (
          <Field>
            <FieldLabel htmlFor={field.name}>Title</FieldLabel>
            <FieldContent>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Enter todo title..."
              />
            </FieldContent>
            {field.state.meta.errors.length > 0 && (
              <FieldError>{field.state.meta.errors[0]?.message}</FieldError>
            )}
          </Field>
        )}
      />
      <div className="flex gap-2">
        {todo ? (
          <Button type="submit" disabled={!form.state.canSubmit}>
            Edit Todo
          </Button>
        ) : (
          <Button type="submit" disabled={!form.state.canSubmit}>
            Add Todo
          </Button>
        )}

        <Button
          type="button"
          variant="outline"
          onClick={() => navigate({ to: "/" })}
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}

export default TodoForm
