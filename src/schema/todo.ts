import { z } from "zod"

export const todoSchema = z.object({
  id: z.string(),
  title: z.string(),
  completed: z.boolean(),
  createdAt: z.date(),
})

export const createTodoSchema = z.object({
  title: z.string().min(1, "Title is required"),
})

export const editTodoSchema = z.object({
  id: z.string().min(1, "Todo id is required"),
  title: z.string().min(1, "Title is required"),
})

export const getTodoByIdSchema = z.object({ id: z.string() })
export const selectTodoByIdSchema = z.object({
  id: z.string(),
  completed: z.boolean(),
})

export const deleteTodoSchema = z.object({ id: z.string() })

export type Todo = z.infer<typeof todoSchema>
export type CreateTodo = z.infer<typeof createTodoSchema>
export type EditTodo = z.infer<typeof editTodoSchema>
