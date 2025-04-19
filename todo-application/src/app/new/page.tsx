import NewTodoForm from "@/components/new-todo-form"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NewTodo() {
    return (
        <main className="container mx-auto p-4 max-w-2xl">
            <div className="flex flex-col items-center">
                <div className="mb-6 w-full">
                    <Link href="/" className="btn btn-ghost">
                        <ArrowLeft />
                        Back to Dashboard
                    </Link>
                </div>

                <div className="card bg-base-200 w-96 shadow-xl p-6">
                    <h1 className="text-3xl font-bold mb-4">Create New Task</h1>
                    <NewTodoForm />
                </div>
            </div>
        </main>
    )
}
