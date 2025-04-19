"use client"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import TodoItem from "./todo-item"
import {oneTodo} from "../../schema/todo_schema";
import {z} from "zod";


type SortableTodoItemProps = {
    todo: z.infer<typeof oneTodo>
    onDelete: (id: string) => void
}

export default function SortableTodoItem({ todo, onDelete }: SortableTodoItemProps) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: todo.TodoID })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    }

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <TodoItem todo={todo} onDelete={onDelete} />
        </div>
    )
}
