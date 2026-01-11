'use client';

import React, { useState } from 'react';
import { User, Lock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { useAuth } from '../context/AuthContext';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            await login(email, password);
        } catch (err: any) {
            console.error("Login page error caught:", err);
            const msg = err.response?.data?.message || err.message || 'Credenziali non valide. Riprova.';
            setError(typeof msg === 'string' ? msg : JSON.stringify(msg));
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 dark:bg-black py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
            <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-900 p-10 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800">
                <div className="text-center">
                    <div className="mx-auto h-12 w-12 bg-sanital-light/10 text-sanital-light rounded-full flex items-center justify-center">
                        <User className="h-6 w-6" />
                    </div>
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">Area Clienti</h2>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Accedi per visualizzare i tuoi ordini e listini dedicati.
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                    {error && (
                        <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-3 rounded-md text-sm text-center">
                            {error}
                        </div>
                    )}
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email-address" className="sr-only">Indirizzo Email</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="appearance-none rounded-lg relative block w-full pl-10 px-3 py-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-500 focus:outline-none focus:ring-sanital-light focus:border-sanital-light focus:z-10 sm:text-sm"
                                    placeholder="Indirizzo Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="appearance-none rounded-lg relative block w-full pl-10 px-3 py-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-500 focus:outline-none focus:ring-sanital-light focus:border-sanital-light focus:z-10 sm:text-sm"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-sanital-light focus:ring-sanital-light border-gray-300 rounded"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                                Ricordami
                            </label>
                        </div>

                        <div className="text-sm">
                            <a href="#" className="font-medium text-sanital-light hover:text-sanital-dark dark:hover:text-sanital-blue-light">
                                Password dimenticata?
                            </a>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sanital-dark hover:bg-sanital-light dark:bg-sanital-blue-dark dark:hover:bg-sanital-blue-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sanital-light transition-colors"
                        >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <ArrowRight className="h-5 w-5 text-sanital-light group-hover:text-white transition-colors" />
                            </span>
                            Accedi
                        </button>
                    </div>
                </form>

                <div className="mt-6 text-center text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Non hai un account? </span>
                    <Link href="/contact" className="font-medium text-sanital-light hover:text-sanital-dark dark:hover:text-sanital-blue-light">
                        Richiedi accesso
                    </Link>
                </div>

            </div>
        </div>
    );
}
