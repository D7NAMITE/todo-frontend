'use client'

import { useEffect, useState } from 'react'
import {createTodo, deleteTodoFromDB, getTodoById, TodoItem, updateTodoFromDB} from "@/action/todo_action";
import {Todo} from "../../schema/todo_schema";

export default function TodoPage() {
    const [todos, setTodos] = useState<TodoItem[]>([])
    const [newTitle, setNewTitle] = useState('')
    const [newDescription, setNewDescription] = useState('')
    const [newStatus, setNewStatus] = useState<Todo['status']>('Todo')

    const fetchTodos = async () => {
        const data = await getTodoById()
        setTodos(data)
    }

    const addTodo = async () => {
        if (!newTitle.trim()) return

        await createTodo(newTitle, newDescription, newStatus)

        setNewTitle('')
        setNewDescription('')
        setNewStatus('Todo')
        fetchTodos()
    }

    const updateStatus = async (id: string, status: Todo['status']) => {
        const current = todos.find((todo) => todo.TodoID === id)
        if (!current) return

        await updateTodoFromDB(id, current.Title, current.Description, status)
        fetchTodos()
    }

    const deleteTodo = async (id: string) => {
        await deleteTodoFromDB(id)
        fetchTodos()
    }

    useEffect(() => {
        fetchTodos()
    }, [])

    return (
        <div className="max-w-xl mx-auto py-8 px-4">
            <h1 className="text-5xl font-bold mb-4 text-primary">Todo List</h1>

            <div className="flex flex-col gap-3 mb-6 bg-base-100 p-4 items-center">
                <input
                    type="text"
                    placeholder="Title"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="input w-full"
                />
                <textarea
                    placeholder="Description"
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    className="textarea w-full"
                />
                <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as Todo['status'])}
                    className="select w-full"
                >
                    <option value="Todo">Todo</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                </select>
                <button
                    onClick={addTodo}
                    className="btn btn-success flex w-full"
                >
                    Add Todo
                </button>
            </div>

            {/* List of todos */}
            <ul className="space-y-4">
                {todos.map((todo) => (
                    <li
                        key={todo.TodoID}
                        className="flex flex-col bg-base-300 rounded p-4 shadow-xl"
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <h2 className="font-semibold text-lg text-secondary">{todo.Title}</h2>
                                <p className="text-sm text-neutral-content">{todo.Description}</p>
                            </div>
                            <button
                                onClick={() => deleteTodo(todo.TodoID)}
                                className="text-base-content hover:text-error"
                            >
                                Delete
                            </button>
                        </div>
                        <div className="mt-2">
                            <label className="block text-sm font-medium mb-1">Status:</label>
                            <select
                                value={todo.Status}
                                onChange={(e) => updateStatus(todo.TodoID, e.target.value as Todo['status'])}
                                className="border rounded px-2 py-1 text-sm"
                            >
                                <option value="Todo">Todo</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Done">Done</option>
                            </select>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
