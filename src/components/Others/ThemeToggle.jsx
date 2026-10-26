import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
    const [theme, setTheme] = useState(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem("taskflow-theme") || "system";
        }
        return "system";
    });

    // Determine if dark mode is active based on manual choice or system preference
    const checkIsDark = (currentTheme) => {
        if (currentTheme === "dark") return true;
        if (currentTheme === "light") return false;
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    };

    const [isDark, setIsDark] = useState(() => checkIsDark(theme));

    // Sync state when changes happen from Settings or other components
    useEffect(() => {
        const handleThemeChange = () => {
            const currentTheme = localStorage.getItem("taskflow-theme") || "system";
            setTheme(currentTheme);
            setIsDark(checkIsDark(currentTheme));
        };

        window.addEventListener("storage", handleThemeChange);
        window.addEventListener("theme-change", handleThemeChange);

        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleSystemChange = () => {
            if (localStorage.getItem("taskflow-theme") === "system") {
                handleThemeChange();
            }
        };

        mediaQuery.addEventListener("change", handleSystemChange);

        return () => {
            window.removeEventListener("storage", handleThemeChange);
            window.removeEventListener("theme-change", handleThemeChange);
            mediaQuery.removeEventListener("change", handleSystemChange);
        };
    }, []);

    // Apply classes to the document root whenever theme or computed isDark changes
    useEffect(() => {
        const root = document.documentElement;
        const shouldUseDark = checkIsDark(theme);
        setIsDark(shouldUseDark);

        if (shouldUseDark) {
            root.classList.add("dark");
            root.style.colorScheme = "dark";
        } else {
            root.classList.remove("dark");
            root.style.colorScheme = "light";
        }
    }, [theme]);

    // Toggle between explicit dark and light modes
    const toggleTheme = () => {
        const newTheme = isDark ? "light" : "dark";
        setTheme(newTheme);
        localStorage.setItem("taskflow-theme", newTheme);
        window.dispatchEvent(new Event("theme-change"));
    };

    return (
        <button
            type="button"
            role="switch"
            aria-checked={isDark}
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="relative inline-flex items-center w-14 h-8 lg:w-16 lg:h-8 rounded-full p-0.75 cursor-pointer bg-slate-100 dark:bg-[#0d1117] border border-slate-200 dark:border-gray-800 shadow-inner transition-colors duration-300 hover:border-blue-300 dark:hover:border-blue-500/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
            <div className="absolute inset-0 flex items-center justify-between px-2.5 text-slate-400 dark:text-gray-600 pointer-events-none">
                <Sun className="w-3.5 h-3.5" />
                <Moon className="w-3.5 h-3.5" />
            </div>

            <span
                className={`relative z-10 w-6 h-6 rounded-full flex items-center justify-center shadow-sm transform-gpu transition-all duration-300 ease-out ${
                    isDark
                        ? "translate-x-6 lg:translate-x-8 bg-blue-600 text-white shadow-blue-600/30 border border-blue-500"
                        : "translate-x-0 bg-white text-slate-700 border border-slate-200"
                }`}
            >
                {isDark ? (
                    <Moon className="w-3.5 h-3.5 fill-current" strokeWidth={2.5} />
                ) : (
                    <Sun className="w-3.5 h-3.5 fill-current text-amber-500" strokeWidth={2.5} />
                )}
            </span>
        </button>
    );
}