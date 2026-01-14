'use client';

import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function LanguageToggle() {
    const { language, setLanguage } = useLanguage();

    return (
        <div className="flex items-center space-x-1 border border-gray-200 dark:border-gray-700 rounded-full p-1 bg-white dark:bg-black/20">
            <button
                onClick={() => setLanguage('it')}
                className={`px-2 py-1 text-xs font-bold rounded-full transition-all duration-200 ${language === 'it'
                        ? 'bg-sanital-light text-white shadow-sm'
                        : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
                    }`}
            >
                IT
            </button>
            <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 text-xs font-bold rounded-full transition-all duration-200 ${language === 'en'
                        ? 'bg-sanital-light text-white shadow-sm'
                        : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
                    }`}
            >
                EN
            </button>
        </div>
    );
}
