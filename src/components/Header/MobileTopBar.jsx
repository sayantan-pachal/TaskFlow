import React from 'react'
import { CheckSquare, Sun, Moon } from 'lucide-react'
import ThemeToggle from '../Others/ThemeToggle'

export default function MobileTopBar() {
    return (
        <header className="md:hidden flex items-center justify-between px-5 py-4 bg-[#0d1117] border-b border-gray-800 sticky top-0 z-40">
            <div className="flex items-center gap-2">
                <img
                    src="/favicon.svg"
                    alt="Logo"
                    className="w-8 h-8 rounded-full"
                />
                <span className="text-lg font-bold tracking-wide">TaskFlow</span>
            </div>
            <ThemeToggle />
        </header>
    )
}