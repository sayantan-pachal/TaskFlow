import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Download, Lightbulb, BarChart2, Loader2, UploadCloud, X, FileJson } from 'lucide-react';
import { useTasks } from '../../../context/TaskContext';
import { useQuote } from '../../../context/QuoteContext';
import { useToast } from '../../../components/Others/ToastContext';

export default function QuickActions() {
    const navigate = useNavigate();
    const showToast = useToast();
    const { openTaskModal, importSampleTasks, isImporting, importUserTasks } = useTasks();
    const { refreshQuote, isLoading: isQuoteLoading } = useQuote();

    // JSON Upload Modal States
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    const handleFileProcess = (file) => {
        if (!file) return;
        
        if (file.type !== "application/json" && !file.name.endsWith(".json")) {
            showToast("Please upload a valid JSON file.", "error");
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                importUserTasks(data);
                setIsUploadModalOpen(false);
            } catch (err) {
                showToast("Failed to parse JSON file. Ensure it's valid JSON.", "error");
            }
        };
        reader.readAsText(file);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        handleFileProcess(file);
    };

    return (
        <>
            <div className="bg-white dark:bg-[#161b22] rounded-2xl border border-slate-200 dark:border-gray-800 p-5 transition-colors mb-8">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Quick Actions</h3>
                
                <div className="flex flex-col gap-3">
                    <button
                        type="button"
                        onClick={() => openTaskModal()}
                        className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer shadow-md shadow-blue-600/20"
                    >
                        <Plus size={18} />
                        <span>Add New Task</span>
                    </button>
                    
                    <button
                        type="button"
                        onClick={() => setIsUploadModalOpen(true)}
                        className="w-full flex items-center justify-center gap-2 bg-slate-50 dark:bg-gray-800/50 hover:bg-slate-100 dark:hover:bg-gray-800 border border-slate-200 dark:border-gray-700 text-slate-700 dark:text-gray-200 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer"
                    >
                        <UploadCloud size={18} className="text-blue-500" />
                        <span>Import from JSON</span>
                    </button>
                    
                    <button
                        type="button"
                        onClick={importSampleTasks}
                        disabled={isImporting}
                        className="w-full flex items-center justify-center gap-2 bg-slate-50 dark:bg-gray-800/50 hover:bg-slate-100 dark:hover:bg-gray-800 border border-slate-200 dark:border-gray-700 text-slate-700 dark:text-gray-200 py-2.5 rounded-xl text-sm font-medium transition-colors disabled:opacity-50 cursor-pointer"
                    >
                        {isImporting ? <Loader2 size={18} className="animate-spin text-blue-500" /> : <Download size={18} className="text-emerald-500" />}
                        <span>{isImporting ? 'Importing...' : 'Fetch Dummy Tasks'}</span>
                    </button>

                    <button
                        type="button"
                        onClick={refreshQuote}
                        disabled={isQuoteLoading}
                        className="w-full flex items-center justify-center gap-2 bg-slate-50 dark:bg-gray-800/50 hover:bg-slate-100 dark:hover:bg-gray-800 border border-slate-200 dark:border-gray-700 text-slate-700 dark:text-gray-200 py-2.5 rounded-xl text-sm font-medium transition-colors disabled:opacity-50 cursor-pointer"
                    >
                        <Lightbulb size={18} className={isQuoteLoading ? 'animate-pulse text-amber-500' : 'text-amber-500'} />
                        <span>{isQuoteLoading ? 'Fetching Tip...' : 'Get New Tip'}</span>
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate('/statistics')}
                        className="w-full flex items-center justify-center gap-2 bg-slate-50 dark:bg-gray-800/50 hover:bg-slate-100 dark:hover:bg-gray-800 border border-slate-200 dark:border-gray-700 text-slate-700 dark:text-gray-200 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer"
                    >
                        <BarChart2 size={18} className="text-purple-500" />
                        <span>View Statistics</span>
                    </button>
                </div>
            </div>

            {/* Custom File Upload Modal */}
            {isUploadModalOpen && (
                <div className="fixed inset-0 z-999 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="w-full max-w-md rounded-2xl bg-white dark:bg-[#161b22] border border-slate-200 dark:border-gray-800 p-6 shadow-2xl animate-in zoom-in-95 duration-200">
                        
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                <FileJson size={20} className="text-blue-500" />
                                Upload Task JSON
                            </h3>
                            <button 
                                onClick={() => setIsUploadModalOpen(false)}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:hover:text-gray-200 dark:hover:bg-gray-800 transition-colors"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Drag and Drop Zone */}
                        <div
                            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                            onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current?.click()}
                            className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center gap-3 transition-colors cursor-pointer text-center ${
                                isDragging 
                                    ? "border-blue-500 bg-blue-50/50 dark:bg-blue-500/10" 
                                    : "border-slate-300 dark:border-gray-700 hover:border-blue-400 dark:hover:border-gray-500 hover:bg-slate-50 dark:hover:bg-gray-800/50"
                            }`}
                        >
                            <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-2">
                                <UploadCloud size={24} />
                            </div>
                            <p className="text-sm font-semibold text-slate-900 dark:text-white">
                                Click to upload or drag and drop
                            </p>
                            <p className="text-xs text-slate-500 dark:text-gray-400">
                                Valid JSON arrays only
                            </p>
                        </div>

                        {/* Hidden Input File */}
                        <input 
                            type="file" 
                            accept=".json,application/json"
                            ref={fileInputRef}
                            className="hidden"
                            onChange={(e) => handleFileProcess(e.target.files[0])}
                        />

                        <div className="flex justify-end mt-6">
                            <button
                                type="button"
                                onClick={() => setIsUploadModalOpen(false)}
                                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-gray-800 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}