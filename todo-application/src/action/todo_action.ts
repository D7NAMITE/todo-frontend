"use server";

import {todos} from "../../schema/todo_schema";
import {auth} from '@clerk/nextjs/server'

const backendUrl = process.env.BACKEND_URL;


export async function getTodoByUid() {
    const userid = await auth()
    // const todo = await fetch(`${backendUrl}/todo/user/${userid}`);
    try {
        const todo = await fetch(`${backendUrl}/todo/user/35095acc-c227-4a50-8595-22ce042ecac3`);
        if (!todo.ok) {
            console.error("Failed to fetch todo")
            return []
        }
        const data = await todo.json();
        return todos.parse(data);

    } catch (error) {
        console.log(error)
        console.error("Failed to fetch todo")
    }
}