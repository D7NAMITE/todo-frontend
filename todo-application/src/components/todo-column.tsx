"use client"

import { useDroppable } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import SortableTodoItem from "./sortable-todo-item"

type Todo = {
    id: string
    title: string
    description: string
    status: string
}

type TodoColumnProps = {
    id: string
    title: string
    todos: Todo[]
    onDelete: (id: string) => void
}

export default function TodoColumn({ id, title, todos, onDelete }: TodoColumnProps) {
    const { setNodeRef } = useDroppable({
        id,
    })

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold">{title}</h2>
            <div ref={setNodeRef} className="min-h-[200px] bg-base-200 rounded-lg p-4 space-y-4">
                <SortableContext items={todos.map((todo) => todo.id)} strategy={verticalListSortingStrategy}>
                    {todos.map((todo) => (
                        <SortableTodoItem key={todo.id} todo={todo} onDelete={onDelete} />
                    ))}
                </SortableContext>

                {todos.length === 0 && (
                    <div className="card border-2 border-dashed bg-transparent">
                        <div className="card-body p-4 text-center text-base-content/50">
                            {id === "todo" && "No tasks yet"}
                            {id === "in-progress" && "No tasks in progress"}
                            {id === "done" && "No completed tasks"}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
