import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
    const [theme, setTheme] = useState(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem("theme") || "dark";
        }
        return "dark";
    });

    const isDark = theme === "dark";

    useEffect(() => {
        const root = document.documentElement;
        if (isDark) {
            root.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            root.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [isDark]);

    return (
        <button
            type="button"
            role="switch"
            aria-checked={isDark}
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            // Changed padding to exactly 3px to perfectly bound the 24px thumb inside the 32px bordered container
            className="relative inline-flex items-center w-14 h-8 lg:w-16 lg:h-8 rounded-full p-[3px] cursor-pointer bg-black/5 dark:bg-white/5 backdrop-blur-md border border-black/10 dark:border-white/10 shadow-inner transition-colors duration-300 hover:border-amber-500/40 dark:hover:border-cyan-400/40 focus:outline-none"
        >
            {/* Background Track Icons */}
            {/* Made absolute to span the full padding box, with 8px padding to perfectly center icons behind the sliding thumb */}
            <div className="absolute inset-0 flex items-center justify-between px-[8px] text-slate-400 dark:text-slate-500 pointer-events-none">
                <Sun className="w-3.5 h-3.5 text-amber-500/70" />
                <Moon className="w-3.5 h-3.5 text-cyan-400/70" />
            </div>

            {/* Sliding Gradient Thumb */}
            {/* Removed absolute positioning so it acts as a flex child, automatically centering itself dynamically */}
            <span
                className={`relative z-10 w-6 h-6 rounded-full flex items-center justify-center shadow-md transform-gpu transition-all duration-300 ease-out ${
                    isDark
                        ? "translate-x-6 lg:translate-x-8 bg-gradient-to-tr from-cyan-500 to-emerald-500 text-slate-950 shadow-cyan-500/25"
                        : "translate-x-0 bg-gradient-to-tr from-orange-500 to-amber-400 text-white shadow-orange-500/25"
                }`}
            >
                {isDark ? (
                    <Moon className="w-3.5 h-3.5 fill-current" strokeWidth={2.5} />
                ) : (
                    <Sun className="w-3.5 h-3.5 fill-current" strokeWidth={2.5} />
                )}
            </span>
        </button>
    );
}