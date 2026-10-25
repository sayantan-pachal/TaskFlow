import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Download, Lightbulb, BarChart2, Loader2 } from 'lucide-react';
import { useTasks } from '../../../context/TaskContext';
import { useQuote } from '../../../context/QuoteContext';

export default function QuickActions() {
    const navigate = useNavigate();
    const { openTaskModal, importSampleTasks, isImporting } = useTasks();
    const { refreshQuote, isLoading: isQuoteLoading } = useQuote();

    return (
        <div className="bg-white dark:bg-[#161b22] rounded-2xl border border-slate-200 dark:border-gray-800 p-5 transition-colors mb-8">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Quick Actions</h3>
            
            <div className="flex flex-col gap-3">
                <button
                    type="button"
                    onClick={() => openTaskModal()}
                    className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer"
                >
                    <Plus size={18} />
                    <span>Add New Task</span>
                </button>
                
                <button
                    type="button"
                    onClick={importSampleTasks}
                    disabled={isImporting}
                    className="w-full flex items-center justify-center gap-2 bg-slate-50 dark:bg-gray-800/50 hover:bg-slate-100 dark:hover:bg-gray-800 border border-slate-200 dark:border-gray-700 text-slate-700 dark:text-gray-200 py-2.5 rounded-xl text-sm font-medium transition-colors disabled:opacity-50 cursor-pointer"
                >
                    {isImporting ? <Loader2 size={18} className="animate-spin text-blue-500" /> : <Download size={18} />}
                    <span>{isImporting ? 'Importing...' : 'Import Sample Tasks'}</span>
                </button>

                <button
                    type="button"
                    onClick={refreshQuote}
                    disabled={isQuoteLoading}
                    className="w-full flex items-center justify-center gap-2 bg-slate-50 dark:bg-gray-800/50 hover:bg-slate-100 dark:hover:bg-gray-800 border border-slate-200 dark:border-gray-700 text-slate-700 dark:text-gray-200 py-2.5 rounded-xl text-sm font-medium transition-colors disabled:opacity-50 cursor-pointer"
                >
                    <Lightbulb size={18} className={isQuoteLoading ? 'animate-pulse text-amber-500' : ''} />
                    <span>{isQuoteLoading ? 'Fetching Tip...' : 'Get New Tip'}</span>
                </button>

                <button
                    type="button"
                    onClick={() => navigate('/statistics')}
                    className="w-full flex items-center justify-center gap-2 bg-slate-50 dark:bg-gray-800/50 hover:bg-slate-100 dark:hover:bg-gray-800 border border-slate-200 dark:border-gray-700 text-slate-700 dark:text-gray-200 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer"
                >
                    <BarChart2 size={18} />
                    <span>View Statistics</span>
                </button>
            </div>
        </div>
    );
}