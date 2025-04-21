import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {
    ClerkProvider,
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
                {children}
            </main>
            </body>
            </html>
        </ClerkProvider>
    );
}
