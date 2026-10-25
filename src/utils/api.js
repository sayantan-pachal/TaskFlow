const STORAGE_KEY = 'taskflow_tasks';
const TASK_API = import.meta.env.VITE_DUMMY_TODOS_API;
const QUOTE_API = import.meta.env.VITE_ADVICE_API;

export const StorageAPI = {
    getTasks: () => {
        try {
            const data = localStorage.getItem(STORAGE_KEY);
            return data ? JSON.parse(data) : [];
        } catch {
            return [];
        }
    },

    saveTasks: (tasks) => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
        } catch (error) {
            console.error("Storage Error:", error);
        }
    }
};

export const ExternalAPI = {
    fetchSampleTasks: async (limit = 5) => {
        if (!TASK_API) {
            throw new Error('TASK_API environment variable is missing.');
        }
        const response = await fetch(`${TASK_API}?limit=${limit}`);
        if (!response.ok) throw new Error('Failed to fetch tasks');
        
        const data = await response.json();
        
        return data.todos.map((todo) => ({
            id: `sample-${todo.id}-${Date.now()}`,
            title: todo.todo,
            category: 'Sample',
            priority: 'Low',
            date: new Date().toLocaleDateString('en-US', { 
                month: 'short', day: 'numeric', year: 'numeric' 
            }),
            status: todo.completed ? 'Completed' : 'Pending',
            checked: todo.completed,
            isSample: true,
        }));
    },

    fetchDailyTip: async () => {
        // Enforce strict reliance on the environment variable
        if (!QUOTE_API) {
            throw new Error('QUOTE_API environment variable is missing.');
        }
        
        const response = await fetch(`${QUOTE_API}?t=${Date.now()}`);
        if (!response.ok) throw new Error('Failed to fetch quote');
        
        const data = await response.json();
        return data.slip.advice;
    }
};