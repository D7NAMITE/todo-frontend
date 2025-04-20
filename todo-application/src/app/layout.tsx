import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {
    ClerkProvider,
    SignInButton,
    SignedIn,
    SignedOut,

} from "@clerk/nextjs";
import Header from "@/components/header";

// Load fonts with CSS variables for Tailwind
const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Todo App",
    description: "Todo App By Nanthawat Duang-ead",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
            <body className="bg-base-100">
            <Header/>
            <main>
                <SignedIn>{children}</SignedIn>
                <SignedOut>
                    <div className="flex items-center justify-center h-[80vh]">
                        <div className="text-center">
                            <p className="text-lg mb-4">Please sign in to continue</p>
                            <SignInButton mode="modal">
                                <button className="btn btn-primary">Sign In</button>
                            </SignInButton>
                        </div>
                    </div>
                </SignedOut>
            </main>
            </body>
            </html>
        </ClerkProvider>
    );
}
