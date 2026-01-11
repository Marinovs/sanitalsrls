'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function ThemeToggle() {
    const { setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    // useEffect only runs on the client, so now we can safely show the UI
    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <Sun className="h-5 w-5 opacity-0" />
            </button>
        ); // Avoid hydration mismatch
    }

    return (
        <button
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-full text-gray-500 hover:text-sanital-light hover:bg-gray-100 dark:text-gray-400 dark:hover:text-sanital-light dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-sanital-light"
            aria-label="Toggle Dark Mode"
        >
            {resolvedTheme === 'dark' ? (
                <Sun className="h-5 w-5" />
            ) : (
                <Moon className="h-5 w-5" />
            )}
        </button>
    );
}
