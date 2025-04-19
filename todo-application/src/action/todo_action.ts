"use server";

import {listTodos} from "../../schema/todo_schema";
import {auth} from '@clerk/nextjs/server'

const backendUrl = process.env.BACKEND_URL;


export async function getTodoByUid() {
    const userid = await auth()
    try {
        const todo = await fetch(`${backendUrl}/todo/user/${userid}`);
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