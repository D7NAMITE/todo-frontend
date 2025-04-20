"use server";

import {listTodos} from "../../schema/todo_schema";
import {auth} from '@clerk/nextjs/server'

const backendUrl = process.env.BACKEND_URL;


export async function getTodoByUid() {
    const {userId} = await auth()
    if (!userId) {
        throw new Error("Unauthorized: user not authenticated");
    }
    try {
        const todo = await fetch(`${backendUrl}/todo/user/${userId}`);
        if (!todo.ok) {
            console.error("Failed to fetch todo")
            return []
        }
        const data = await todo.json();
        return listTodos.parse(data);

    } catch (error) {
        console.error("Failed to fetch todo")
    }
}

interface CreateTodoParams {
    UserID: string;
    Title: string;
    Description: string;
    Status: string;
}

export async function createTodo(Title: string, Description: string, Status:string) {
    const { userId } = await auth();
    if (!userId) {
        return {
            error: `Error`,
        };
    }
    try {
        const params: CreateTodoParams = {
            UserID: userId,
            Title: Title,
            Description: Description,
            Status: Status,
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
        console.error("Fetch error:", fetchError);
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
        console.error("Fetch error:", fetchError);
        return { success: false, projectId: "", error: String(fetchError) };
    }
}