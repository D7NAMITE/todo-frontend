"use client"

import { useState } from "react"
import {
    DndContext,
    DragOverlay,
    closestCorners,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    type DragStartEvent,
    type DragEndEvent,
    type DragOverEvent,
} from "@dnd-kit/core"
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable"
import { restrictToWindowEdges } from "@dnd-kit/modifiers"
import TodoColumn from "@/components/todo-column"
import TodoItem from "@/components/todo-item"
import {listTodos, Todo} from "../../schema/todo_schema";
import {z} from "zod";


export default function KanbanBoard({
                                        initialTodos,
                                    }: {
    initialTodos: z.infer<typeof listTodos>
}) {
    const [todos, setTodos] = useState(initialTodos)
    const [activeId, setActiveId] = useState<string | null>(null)

    // Group todos by status
    const columns = {
        todo: todos.filter((todo) => todo.Status === "Todo"),
        "In-progress": todos.filter((todo) => todo.Status === "InProgress"),
        done: todos.filter((todo) => todo.Status === "Done"),
    }

    // Find the active todo
    const activeTodo = activeId ? todos.find((todo) => todo.TodoID === activeId) : null

    // Configure sensors for drag detection
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    )

    // Handle drag start
    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event
        setActiveId(active.id as string)
    }

    // Handle drag over
    const handleDragOver = (event: DragOverEvent) => {
        const { active, over } = event

        if (!over) return

        const activeId = active.id as string
        const overId = over.id as string

        // Find the containers (columns)
        const activeContainer = findContainer(activeId)
        const overContainer = findContainer(overId)

        if (!activeContainer || !overContainer || activeContainer === overContainer) {
            return
        }

        setTodos((prev) => {
            const activeTodo = prev.find((todo) => todo.TodoID === activeId)
            if (!activeTodo) return prev

            // Create a new array without the dragged todo
            const newTodos = prev.filter((todo) => todo.TodoID !== activeId)

            // Create a new todo with the updated status
            const updatedTodo = {
                ...activeTodo,
                status: overContainer,
            }

            // Add the updated todo to the array
            return [...newTodos, updatedTodo]
        })
    }

    // Handle drag end
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event

        setActiveId(null)

        if (!over) return

        const activeId = active.id as string
        const overId = over.id as string

        // Find the containers (columns)
        const activeContainer = findContainer(activeId)
        const overContainer = findContainer(overId)

        if (!activeContainer || !overContainer) {
            return
        }

        // If the item was dropped in a different container, we've already
        // updated the state in handleDragOver, so we can return early
        if (activeContainer !== overContainer) {
            return
        }

        // Get the items in the active container
        const activeItems = columns[activeContainer as keyof typeof columns]

        // Find the indices of the active and over items
        const activeIndex = activeItems.findIndex((item) => item.TodoID === activeId)
        const overIndex = activeItems.findIndex((item) => item.TodoID === overId)

        // If the indices are the same, the item was dropped in the same place
        if (activeIndex === overIndex) {
            return
        }

        // Reorder the items in the active container
        setTodos((prev) => {
            const activeItems = prev.filter((item) => item.Status === activeContainer)
            const reorderedItems = arrayMove(activeItems, activeIndex, overIndex)

            // Create a new array with the reordered items
            return [...prev.filter((item) => item.Status !== activeContainer), ...reorderedItems]
        })
    }

    // Helper function to find the container (column) of an item
    const findContainer = (id: string) => {
        if (id === "todo" || id === "in-progress" || id === "done") {
            return id
        }

        const todo = todos.find((todo) => todo.TodoID === id)
        return todo?.Status
    }

    const deleteTodo = (id: string) => {
        setTodos(todos.filter((todo) => todo.TodoID !== id))
        // In a real app, you would delete from the database
        // deleteTodoFromDatabase(id);
    }

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
        >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Todo Column */}
                <TodoColumn id="todo" title="To Do" todos={columns.todo} onDelete={deleteTodo} />

                {/* In Progress Column */}
                <TodoColumn id="in-progress" title="In Progress" todos={columns["In-progress"]} onDelete={deleteTodo} />

                {/* Done Column */}
                <TodoColumn id="done" title="Done" todos={columns.done} onDelete={deleteTodo} />
            </div>

            {/* Drag Overlay */}
            <DragOverlay modifiers={[restrictToWindowEdges]}>
                {activeId && activeTodo ? (
                    <div className="opacity-80">
                        <TodoItem todo={activeTodo} onDelete={() => {}} isOverlay />
                    </div>
                ) : null}
            </DragOverlay>
        </DndContext>
    )
}
