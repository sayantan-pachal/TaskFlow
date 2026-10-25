
import React from "react";
import { Sparkles, LockKeyhole } from "lucide-react";

export default function ProfileComingSoon() {
    return (
        <div className="relative isolate">
            {/* Keep your existing Profile page underneath */}
            <div className="pointer-events-none select-none blur-[5px] opacity-60">
                {/* Replace this with your existing Profile JSX */}
                <div className="mx-auto max-w-5xl space-y-6 p-5">
                    <div className="h-32 rounded-2xl bg-slate-200 dark:bg-slate-800" />
                    <div className="h-64 rounded-2xl bg-slate-200 dark:bg-slate-800" />
                    <div className="h-48 rounded-2xl bg-slate-200 dark:bg-slate-800" />
                </div>
            </div>

            {/* Frosted glass overlay */}
            <div className="absolute inset-0 z-10 flex items-start justify-center overflow-hidden rounded-2xl px-4 pt-10 sm:pt-16">
                {/* Prism glow */}
                <div className="pointer-events-none absolute inset-0 bg-white/35 dark:bg-slate-950/35 backdrop-blur-xl" />

                <div className="pointer-events-none absolute -left-16 top-20 h-56 w-56 rounded-full bg-cyan-400/20 blur-3xl" />
                <div className="pointer-events-none absolute -right-16 top-32 h-56 w-56 rounded-full bg-violet-500/20 blur-3xl" />
                <div className="pointer-events-none absolute bottom-0 left-1/3 h-48 w-48 rounded-full bg-blue-500/15 blur-3xl" />

                {/* Coming soon card */}
                <div className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-white/60 bg-white/50 p-7 text-center shadow-2xl shadow-slate-900/10 backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/45 dark:shadow-black/20">
                    <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-white/35 via-transparent to-cyan-400/10 dark:from-white/10 dark:to-violet-500/10" />

                    <div className="relative">
                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/70 bg-white/60 text-blue-600 shadow-lg dark:border-white/10 dark:bg-slate-800/70 dark:text-blue-400">
                            <Sparkles size={26} />
                        </div>

                        <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-blue-200/70 bg-blue-50/70 px-3 py-1 text-[10px] font-bold tracking-[0.2em] text-blue-700 dark:border-blue-400/20 dark:bg-blue-400/10 dark:text-blue-300">
                            <LockKeyhole size={12} />
                            COMING SOON
                        </span>

                        <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                            Your profile, reimagined.
                        </h2>

                        <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                            We're working on something better. Your personal workspace will
                            be available here soon.
                        </p>

                        <div className="mx-auto mt-6 h-1 w-20 overflow-hidden rounded-full bg-slate-300/60 dark:bg-slate-700/70">
                            <div className="h-full w-2/3 rounded-full bg-linear-to-r from-blue-500 via-cyan-400 to-violet-500" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
