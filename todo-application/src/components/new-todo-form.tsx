"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {createTodo} from "@/action/todo_action";

export default function NewTodoForm() {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsLoading(true)

        const formData = new FormData(event.currentTarget)
        const title = formData.get("title") as string
        const description = formData.get("description") as string
        const status = formData.get("status") as string

        try {
            await createTodo(title, description, status);
            router.push("/")
        } catch (error) {
            console.error("Failed to create todo:", error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="bg-base-200">
            <form onSubmit={handleSubmit}>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Task Title</span>
                    </label>
                    <input type="text" name="title" placeholder="Enter task title" className="input input-bordered" required />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Description</span>
                    </label>
                    <textarea
                        name="description"
                        placeholder="Enter task description"
                        className="textarea textarea-bordered"
                        rows={4}
                    />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Status</span>
                    </label>
                    <select name="status" className="select select-bordered w-full" defaultValue="todo">
                        <option value="Todo">To Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                    </select>
                </div>

                <div className="form-control mt-6 flex-row justify-end gap-2">
                    <button
                        type="button"
                        className="btn btn-outline"
                        onClick={() => router.push("/")}
                        disabled={isLoading}
                    >
                        Cancel
                    </button>
                    <button type="submit" className={`btn btn-primary ${isLoading ? "loading" : ""}`} disabled={isLoading}>
                        {isLoading ? "Creating..." : "Create Task"}
                    </button>
                </div>
            </form>
        </div>
    )
}
