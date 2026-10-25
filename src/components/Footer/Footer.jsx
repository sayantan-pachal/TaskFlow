
import React from "react";
import { CheckSquare, ExternalLink } from "lucide-react";

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="mt-auto border-t border-slate-200/80 bg-white/80 px-5 py-5 dark:border-slate-800 dark:bg-slate-950/80">
            <div className="mx-auto flex max-w-screen-2xl flex-col gap-3 text-center text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:text-left dark:text-slate-400 ">
                <div className="flex items-center justify-center gap-2 sm:justify-start">
                    <CheckSquare
                        size={16}
                        className="text-blue-600 dark:text-blue-400"
                        aria-hidden="true"
                    />
                    <span>
                        © {currentYear} <span className="font-semibold text-slate-700 dark:text-slate-200">TaskFlow</span>
                        . All rights reserved.
                    </span>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
                    <span className="inline-flex items-center gap-1.5">
                        Powered by
                        <span className="font-medium text-slate-600 dark:text-slate-300">
                            DummyJSON
                        </span>
                        <span>&</span>
                        <span className="font-medium text-slate-600 dark:text-slate-300">
                            Advice Slip
                        </span>
                    </span>
                    <span className="hidden h-3 w-px bg-slate-300 sm:block dark:bg-slate-700" />
                    <span className="rounded-full border border-slate-200 px-2.5 py-1 dark:border-slate-800">
                        v1.0.0
                    </span>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
