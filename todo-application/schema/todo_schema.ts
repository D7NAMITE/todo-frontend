import { z } from "zod";

export const todoSchema = z.object({
    TodoID: z.coerce.string(),
    UserID: z.coerce.string(),
    Title: z.coerce.string(),
    Description: z.coerce.string(),
    Status: z.coerce.string(),
    CreatedAt: z.coerce.string(),
    UpdatedAt: z.coerce.string(),
});

export const todos = z.array(todoSchema)
