'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { User, Shield, LogOut } from 'lucide-react';

export default function ProfilePage() {
    const { user, isAuthenticated, isLoading, logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push('/login');
        }
    }, [isLoading, isAuthenticated, router]);

    if (isLoading || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sanital-light"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white dark:bg-gray-900 shadow rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800">
                    <div className="px-4 py-5 sm:px-6 flex justify-between items-center bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-800">
                        <div>
                            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                                Profilo Utente
                            </h3>
                            <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
                                Dettagli personali e permessi.
                            </p>
                        </div>
                        <button
                            onClick={logout}
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                            <LogOut className="mr-2 h-4 w-4" />
                            Esci
                        </button>
                    </div>
                    <div className="px-4 py-5 sm:p-6">
                        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                            <div className="sm:col-span-1">
                                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Email
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 dark:text-white flex items-center">
                                    <User className="mr-2 h-4 w-4 text-sanital-light" />
                                    {user.email}
                                </dd>
                            </div>
                            <div className="sm:col-span-1">
                                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Ruolo
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 dark:text-white flex items-center capitalize">
                                    <Shield className="mr-2 h-4 w-4 text-sanital-light" />
                                    {user.role}
                                </dd>
                            </div>
                            <div className="sm:col-span-2">
                                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    ID Utente
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 dark:text-white font-mono bg-gray-100 dark:bg-gray-800 p-2 rounded">
                                    {user._id}
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    );
}
