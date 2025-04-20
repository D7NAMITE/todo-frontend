"use client";

import { ListTodo } from "lucide-react";
import {
    SignedIn,
    SignedOut,
    UserButton,
    SignInButton,
} from "@clerk/nextjs";

export default function Header() {
    return (
        <header>
            <div className="navbar bg-base-100 shadow-sm justify-between">
                <a className="btn btn-ghost text-xl text-primary flex items-center gap-2">
                    <ListTodo />
                    TODO
                </a>
                <div className="flex gap-2">
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                    <SignedOut>
                        <SignInButton mode="modal">
                            <button className="btn btn-primary">Sign In</button>
                        </SignInButton>
                    </SignedOut>
                </div>
            </div>
        </header>
    );
}