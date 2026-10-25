import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

function Edgecase() {
    const navigate = useNavigate();

    return (
        <div className="h-dvh w-full p-4 bg-[#FAFAFA] dark:bg-[#050505] flex flex-col items-center justify-center font-dm overflow-hidden animate-in fade-in duration-500">
            
            {/* Main Illustration - Constrained dynamically by screen height */}
            <img
                src="/error.svg"
                alt="Unexpected Route"
                className="w-auto h-[60vh] max-h-75 mb-2 drop-shadow-xl hover:scale-105 transition-transform duration-700 ease-out object-contain"
            />

            {/* Typography Section */}
            <div className="flex flex-col items-center text-center space-y-2">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
                    Looks like you're lost!
                </h1>
                <h4 className="text-xl sm:text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-purple-500 tracking-tight">
                    Something went wrong...
                </h4>
                
                <p className="text-sm md:text-base max-w-md mx-auto mt-2 text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
                    We couldn't find the route you were looking for. It might have been moved, or there was an unexpected system error.
                </p>
            </div>
        </div>
    );
}

export default Edgecase;