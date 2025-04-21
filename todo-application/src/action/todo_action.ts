"use server";

import {listTodos} from "../../schema/todo_schema";
import {auth} from '@clerk/nextjs/server'

const backendUrl = process.env.BACKEND_URL;


export interface TodoItem {
    TodoID: string;
    ClerkID: string;
    Title: string;
    Description: string;
    Status: string;
    CreatedAt: string;
    UpdatedAt: string;
}

export async function getTodoById() {
    try {
        const {userId} = await auth()
        const res = await fetch(`http://localhost:8080/todo/user/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch todos for user ${userId}`);
        }

        const data: TodoItem[] = await res.json();
        return data;
    } catch (error) {
        console.error("Error fetching todos:", error);
        return [];
    }
}


interface CreateTodoParams {
    UserID: string;
    Title: string;
    Description: string;
    Status: string;
}

export async function createTodo(title: string, description: string, status:string) {
    const { userId } = await auth();
    if (!userId) {
        return {
            error: `Error`,
        };
    }
    try {
        const params: CreateTodoParams = {
            UserID: userId,
            Title: title,
            Description: description,
            Status: status,
        }
        console.log(params)
        const todo = await fetch(`${backendUrl}/todo/new`, {
            method: "POST",
            body: JSON.stringify(params),
        });

        if (!todo.ok) {
            console.error(`Server responded with status: ${todo.status}`);
            return {
                error: `Server error: ${todo.status}`,
            };
        }

        const responseText = await todo.text();

        const result = { success: true, projectId: responseText };
        console.log(result);
        return result;
    } catch (fetchError) {
        console.error("Create error:", fetchError);
        return { success: false, projectId: "", error: String(fetchError) };
    }
}

interface DeleteTodoParams {
    TodoID: string
}

export async function deleteTodoFromDB(todoID: string) {
    try {
        const params: DeleteTodoParams = {
            TodoID: todoID
        }
        console.log(params)
        const todo = await fetch(`${backendUrl}/todo/delete`, {
            method: "POST",
            body: JSON.stringify(params),
        });

        if (!todo.ok) {
            console.error(`Server responded with status: ${todo.status}`);
            return {
                error: `Server error: ${todo.status}`,
            };
        }

        const responseText = await todo.text();

        const result = { success: true, projectId: responseText };
        console.log(result);
        return result;
    } catch (fetchError) {
        console.error("Delete error:", fetchError);
        return { success: false, projectId: "", error: String(fetchError) };
    }
}

interface UpdateTodoParams {
    TodoID: string;
    Title: string;
    Description: string;
    Status: string;
}

export async function updateTodoFromDB(todoID: string, title: string, description: string, status:string) {
    try {
        const params: UpdateTodoParams = {
            TodoID: todoID,
            Title: title,
            Description: description,
            Status: status,
        }
        console.log(params)
        const todo = await fetch(`${backendUrl}/todo/update`, {
            method: "POST",
            body: JSON.stringify(params),
        });

        if (!todo.ok) {
            console.error(`Server responded with status: ${todo.status}`);
            return {
                error: `Server error: ${todo.status}`,
            };
        }

        const responseText = await todo.text();

        const result = { success: true, projectId: responseText };
        console.log(result);
        return result;
    } catch (fetchError) {
        console.error("Update error:", fetchError);
        return { success: false, projectId: "", error: String(fetchError) };
    }
}