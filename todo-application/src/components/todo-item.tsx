"use client"

import { useState } from "react"

type Todo = {
    id: string
    title: string
    description: string
    status: string
}

type TodoItemProps = {
    todo: Todo
    onDelete: (id: string) => void
    isOverlay?: boolean
}

export default function TodoItem({ todo, onDelete, isOverlay = false }: TodoItemProps) {
    const [isEditing, setIsEditing] = useState(false)
    const [editedTitle, setEditedTitle] = useState(todo.title)
    const [editedDescription, setEditedDescription] = useState(todo.description)

    const handleSave = () => {
        // In a real app, you would update the database here
        // updateTodo(todo.id, { title: editedTitle, description: editedDescription });
        setIsEditing(false)
    }

    const handleCancel = () => {
        setEditedTitle(todo.title)
        setEditedDescription(todo.description)
        setIsEditing(false)
    }

    return (
        <div className={`card bg-base-100 shadow-sm ${isOverlay ? "cursor-grabbing" : "cursor-grab"}`}>
            {isEditing ? (
                <div className="card-body p-4">
                    <input
                        type="text"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                        className="input input-bordered w-full font-medium"
                    />
                    <textarea
                        value={editedDescription}
                        onChange={(e) => setEditedDescription(e.target.value)}
                        className="textarea textarea-bordered resize-none"
                        rows={2}
                    />
                    <div className="card-actions justify-between mt-2">
                        <div className="flex gap-2">
                            <button className="btn btn-sm btn-outline" onClick={handleSave}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 mr-1"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                                Save
                            </button>
                            <button className="btn btn-sm btn-outline" onClick={handleCancel}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 mr-1"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="card-body p-4">
                    <h3 className="card-title text-base">{todo.title}</h3>
                    <p className="text-sm text-base-content/70">{todo.description}</p>
                    {!isOverlay && (
                        <div className="card-actions justify-between mt-2">
                            <div className="flex gap-2">
                                <button className="btn btn-sm btn-outline" onClick={() => setIsEditing(true)}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 mr-1"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                    </svg>
                                    Edit
                                </button>
                                <button className="btn btn-sm btn-outline btn-error" onClick={() => onDelete(todo.id)}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 mr-1"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <polyline points="3 6 5 6 21 6" />
                                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                        <line x1="10" y1="11" x2="10" y2="17" />
                                        <line x1="14" y1="11" x2="14" y2="17" />
                                    </svg>
                                    Delete
                                </button>
                            </div>
                            <div className="badge">
                                {todo.status === "todo" && "To Do"}
                                {todo.status === "in-progress" && "In Progress"}
                                {todo.status === "done" && "Done"}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
