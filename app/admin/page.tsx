'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import CsvUploader from '../components/CsvUploader';
import { ShieldAlert, LayoutDashboard, LogOut } from 'lucide-react';

export default function AdminDashboard() {
    const { user, isAuthenticated, isLoading, logout } = useAuth();
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        if (!isLoading) {
            if (!isAuthenticated) {
                router.push('/login');
            } else if (user?.role !== 'admin') {
                router.push('/'); // Redirect non-admins to home
            } else {
                setIsAuthorized(true);
            }
        }
    }, [isAuthenticated, isLoading, user, router]);

    if (isLoading || !isAuthorized) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sanital-light"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            {/* Admin Header */}
            <header className="bg-white dark:bg-black shadow-sm border-b border-gray-200 dark:border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <LayoutDashboard className="h-6 w-6 text-sanital-light" />
                        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Pannello Amministratore</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            {user?.email}
                        </span>
                        <button
                            onClick={logout}
                            className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 font-medium"
                        >
                            <LogOut className="h-4 w-4" />
                            Esci
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="bg-white dark:bg-black rounded-lg shadow border border-gray-200 dark:border-gray-800 overflow-hidden">
                    <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                        <h2 className="text-lg font-medium text-gray-900 dark:text-white flex items-center gap-2">
                            <ShieldAlert className="h-5 w-5 text-sanital-light" />
                            Gestione Catalogo
                        </h2>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Carica un file CSV per aggiornare i prodotti del sito.
                        </p>
                    </div>

                    <div className="p-6 bg-gray-50 dark:bg-gray-900/50">
                        {/* The Uploader component handles the logic and UI for the upload */}
                        <CsvUploader />
                    </div>
                </div>
            </main>
        </div>
    );
}
