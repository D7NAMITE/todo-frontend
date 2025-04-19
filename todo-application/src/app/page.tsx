import KanbanBoard from "@/components/kanban-board"
import Link from "next/link"

// This would come from your database in a real application
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
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">My Tasks</h1>
                <div className="flex items-center gap-4">
                    <Link href="/new" className="btn btn-primary">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-2"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="8" x2="12" y2="16" />
                            <line x1="8" y1="12" x2="16" y2="12" />
                        </svg>
                        Add Task
                    </Link>
                </div>
            </div>

            <KanbanBoard initialTodos={mockTodos} />
        </main>
    )
}
