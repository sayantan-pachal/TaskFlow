import React from 'react';
import { Lightbulb } from 'lucide-react';
import { useQuote } from '../../../context/QuoteContext';

export default function DailyTip() {
    const { quote, isLoading } = useQuote();

    return (
        <div className="relative overflow-hidden rounded-2xl p-6 mb-8 border border-blue-200/80 dark:border-blue-800/40 bg-linear-to-br from-blue-50 via-indigo-50/50 to-blue-100/70 dark:from-blue-950 dark:via-slate-900 dark:to-slate-950 shadow-sm transition-colors duration-300">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400/15 dark:bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                    <Lightbulb size={18} className="text-amber-500 dark:text-yellow-400 shrink-0" />
                    <h3 className="text-xs md:text-sm font-bold tracking-wide uppercase text-blue-900/80 dark:text-blue-200">
                        Daily Productivity Tip
                    </h3>
                </div>

                {/* Content / Loading Skeleton */}
                {isLoading ? (
                    <div className="space-y-2 py-1 animate-pulse">
                        <div className="h-5 bg-blue-200/60 dark:bg-slate-700/60 rounded-md w-5/6" />
                        <div className="h-4 bg-blue-200/40 dark:bg-slate-700/40 rounded-md w-1/3 mt-2" />
                    </div>
                ) : (
                    <>
                        <p className="text-base md:text-lg font-semibold italic text-slate-800 dark:text-white leading-snug mb-2">
                            &ldquo;{quote}&rdquo;
                        </p>
                        <p className="text-xs md:text-sm font-medium text-blue-600 dark:text-blue-300">
                            — Keep going!
                        </p>
                    </>
                )}
            </div>

            {/* Vector Mountain Silhouette */}
            <svg
                className="absolute bottom-0 left-0 right-0 w-full h-14 pointer-events-none opacity-40 dark:opacity-30"
                viewBox="0 0 200 60"
                preserveAspectRatio="none"
            >
                <polygon points="0,60 45,22 95,60" className="fill-blue-400 dark:fill-blue-700" />
                <polygon points="60,60 120,12 180,60" className="fill-indigo-500 dark:fill-indigo-800" />
                <polygon points="135,60 170,30 200,60" className="fill-blue-600 dark:fill-blue-900" />
            </svg>
        </div>
    );
}