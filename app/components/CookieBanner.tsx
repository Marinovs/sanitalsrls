'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieBanner() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check local storage for consent
        const consent = localStorage.getItem('sanital_cookie_consent');
        if (!consent) {
            // Delay visibility for animation effect
            const timer = setTimeout(() => setIsVisible(true), 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('sanital_cookie_consent', 'accepted');
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem('sanital_cookie_consent', 'declined');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-slide-up">
            <div className="max-w-7xl mx-auto bg-white dark:bg-gray-900 border border-t border-gray-200 dark:border-gray-800 rounded-lg shadow-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">

                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Utilizziamo i cookie</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                        Utilizziamo cookie propri e di terzi per garantirti la migliore esperienza sul nostro sito web,
                        analizzare il traffico e offrirti contenuti personalizzati.
                        Per saperne di più, consulta la nostra{' '}
                        <Link href="/cookie-policy" className="text-sanital-dark dark:text-sanital-light hover:underline font-medium">
                            Cookie Policy
                        </Link>
                        {' '}e{' '}
                        <Link href="/privacy-policy" className="text-sanital-dark dark:text-sanital-light hover:underline font-medium">
                            Privacy Policy
                        </Link>.
                    </p>
                </div>

                <div className="flex space-x-4 shrink-0">
                    <button
                        onClick={handleDecline}
                        className="px-4 py-2 bg-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm font-medium transition-colors"
                    >
                        Rifiuta non essenziali
                    </button>
                    <button
                        onClick={handleAccept}
                        className="px-6 py-2 bg-sanital-dark dark:bg-sanital-light text-white text-sm font-semibold rounded-full hover:bg-sanital-light dark:hover:bg-white dark:hover:text-black transition-all shadow-md hover:shadow-lg"
                    >
                        Accetto tutti i cookie
                    </button>
                </div>
            </div>
        </div>
    );
}
