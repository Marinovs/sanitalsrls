'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, ArrowRight, Printer, Wallet, Truck } from 'lucide-react';
import Link from 'next/link';

function SuccessContent() {
    const searchParams = useSearchParams();
    const method = searchParams.get('method');
    const [date, setDate] = useState('');

    useEffect(() => {
        setDate(new Date().toLocaleDateString('it-IT'));
    }, []);

    return (
        <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-xl max-w-2xl w-full text-center border border-gray-100 dark:border-gray-800">
            <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 dark:bg-green-900/30 mb-8">
                <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
            </div>

            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">
                Grazie per il tuo ordine!
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                Abbiamo ricevuto la tua richiesta. Ti abbiamo inviato un'email di conferma con i dettagli.
            </p>

            {method === 'bonifico' && (
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 text-left mb-8 border border-blue-100 dark:border-blue-800">
                    <div className="flex items-center mb-4">
                        <Wallet className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white">Dati per il Bonifico</h2>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                        Effettua il pagamento utilizzando le seguenti coordinate bancarie. Il tuo ordine sarà spedito non appena riceveremo l'accredito.
                    </p>
                    <div className="space-y-2 font-mono text-sm bg-white dark:bg-black p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                        <div className="flex justify-between">
                            <span className="text-gray-500">Beneficiario:</span>
                            <span className="font-bold text-gray-900 dark:text-white">Sanital SRLS</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">IBAN:</span>
                            <span className="font-bold text-gray-900 dark:text-white break-all">IT00 A123 4567 8901 2345 6789 00</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Banca:</span>
                            <span className="font-bold text-gray-900 dark:text-white">Banca Intesa Sanpaolo</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Causale:</span>
                            <span className="font-bold text-gray-900 dark:text-white">Ordine Web del {date} - [Tuo Cognome]</span>
                        </div>
                    </div>
                </div>
            )}

            {method === 'contrassegno' && (
                <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-6 text-left mb-8 border border-green-100 dark:border-green-800">
                    <div className="flex items-center mb-4">
                        <Truck className="h-6 w-6 text-green-600 dark:text-green-400 mr-2" />
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white">Pagamento alla Consegna</h2>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                        Il tuo ordine è stato confermato! Prepara l'importo esatto in contanti per il corriere.
                    </p>
                </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                    href="/products"
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-sanital-light hover:bg-sanital-dark transition-colors"
                >
                    Continua lo shopping
                    <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <button
                    onClick={() => window.print()}
                    className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-700 text-base font-medium rounded-xl text-gray-700 dark:text-white bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                    Stampa riepilogo
                    <Printer className="ml-2 h-5 w-5" />
                </button>
            </div>
        </div>
    );
}

export default function CheckoutSuccess() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
            <Suspense fallback={<div className="text-center text-white">Caricamento...</div>}>
                <SuccessContent />
            </Suspense>
        </div>
    );
}
