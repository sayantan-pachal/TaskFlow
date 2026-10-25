import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ExternalAPI } from '../utils/api';
import { useToast } from '../components/Others/ToastContext'; // Adjust path if necessary

const QuoteContext = createContext();

export const QuoteProvider = ({ children }) => {
    const showToast = useToast();
    
    // Provide a fallback quote so the UI never looks broken, even on error
    const [quote, setQuote] = useState("Progress is more important than perfection.");
    const [isLoading, setIsLoading] = useState(true);

    const refreshQuote = useCallback(async () => {
        try {
            setIsLoading(true);
            const fetched = await ExternalAPI.fetchDailyTip();
            if (fetched) {
                setQuote(fetched);
            }
        } catch (error) {
            console.error("Quote fetch error:", error);
            // Trigger the toast notification on failure
            showToast(error.message || "Failed to fetch daily tip", "error");
        } finally {
            setIsLoading(false);
        }
    }, [showToast]);

    useEffect(() => {
        refreshQuote();
    }, [refreshQuote]);

    return (
        <QuoteContext.Provider value={{ quote, isLoading, refreshQuote }}>
            {children}
        </QuoteContext.Provider>
    );
};

export const useQuote = () => useContext(QuoteContext);