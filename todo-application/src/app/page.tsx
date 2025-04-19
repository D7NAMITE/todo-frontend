import KanbanBoard from "@/components/kanban-board"
import { SquarePlus } from 'lucide-react';
import Link from "next/link"

const mockTodos = [
    { id: "1", title: "Create project structure", description: "Set up Next.js project", status: "todo" },
    { id: "2", title: "Design UI components", description: "Create reusable components", status: "todo" },
    { id: "3", title: "Implement authentication", description: "Add login/signup functionality", status: "in-progress" },
    { id: "4", title: "Create Kanban board", description: "Implement drag and drop", status: "in-progress" },
    { id: "5", title: "Connect to database", description: "Set up database connection", status: "done" },
]

export default function Dashboard() {
    return (
        <main className="container mx-auto p-4 space-y-6">
            <div className="flex justify-end">
                <div className="flex items-center gap-4">
                    <button className="btn btn-primary">
                        <SquarePlus />
                        Add Task
                    </button>
                </div>
            </div>
            <KanbanBoard initialTodos={mockTodos} />
        </main>
    )
}
