import { z } from "zod";

export const oneTodo = z.object({
    TodoID: z.coerce.string(),
    UserID: z.coerce.string(),
    Title: z.coerce.string(),
    Description: z.coerce.string(),
    Status: z.coerce.string(),
    CreatedAt: z.coerce.string(),
    UpdatedAt: z.coerce.string(),
});

export const listTodos = z.array(oneTodo)

export type Todo = {
    id: string
    title: string
    description: string
    status: string
}
