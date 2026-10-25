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
            className="relative inline-flex items-center w-14 h-8 lg:w-16 lg:h-8 rounded-full p-0.75 cursor-pointer bg-black/5 dark:bg-white/5 backdrop-blur-md border border-black/10 dark:border-white/10 shadow-inner transition-colors duration-300 hover:border-amber-500/40 dark:hover:border-cyan-400/40 focus:outline-none"
        >
            <div className="absolute inset-0 flex items-center justify-between px-2 text-slate-400 dark:text-slate-500 pointer-events-none">
                <Sun className="w-3.5 h-3.5 text-amber-500/70" />
                <Moon className="w-3.5 h-3.5 text-cyan-400/70" />
            </div>

            <span
                className={`relative z-10 w-6 h-6 rounded-full flex items-center justify-center shadow-md transform-gpu transition-all duration-300 ease-out ${
                    isDark
                        ? "translate-x-6 lg:translate-x-8 bg-linear-to-tr from-cyan-500 to-emerald-500 text-slate-950 shadow-cyan-500/25"
                        : "translate-x-0 bg-linear-to-tr from-orange-500 to-amber-400 text-white shadow-orange-500/25"
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