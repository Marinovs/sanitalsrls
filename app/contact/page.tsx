'use client';

import React from 'react';

import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function Contact() {
    return (
        <div className="bg-white dark:bg-black min-h-screen">
            {/* Header */}
            <div className="bg-sanital-dark dark:bg-gray-900 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-extrabold text-white sm:text-5xl">Contattaci</h1>
                    <p className="mt-4 text-xl text-blue-100 max-w-2xl mx-auto">
                        Siamo a tua disposizione per informazioni, preventivi e assistenza tecnica.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

                    {/* Info Column */}
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Informazioni di Contatto</h2>

                        <div className="space-y-8">
                            <div className="flex items-start">
                                <div className="shrink-0">
                                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-sanital-light/10 text-sanital-light">
                                        <Phone className="h-6 w-6" />
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Telefono</h3>
                                    <p className="mt-1 text-gray-500 dark:text-gray-400">
                                        Lun-Ven dalle 9:00 alle 18:00
                                    </p>
                                    <p className="mt-1 text-lg font-semibold text-sanital-dark dark:text-sanital-light">
                                        +39 328 869 9232
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="shrink-0">
                                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-sanital-light/10 text-sanital-light">
                                        <Mail className="h-6 w-6" />
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Email</h3>
                                    <p className="mt-1 text-gray-500 dark:text-gray-400">
                                        Per info generali e commerciali
                                    </p>
                                    <a href="mailto:info@sanitalsrls.it" className="mt-1 text-lg font-semibold text-sanital-dark dark:text-sanital-light hover:underline">
                                        sanitalsrls@gmail.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="shrink-0">
                                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-sanital-light/10 text-sanital-light">
                                        <MapPin className="h-6 w-6" />
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Sede Operativa</h3>

                                    <address className="mt-1 not-italic text-gray-600 dark:text-gray-400">
                                        Via Quercete 43<br />
                                        81016 San Potito Sannitico (CE), Italia
                                    </address>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="shrink-0">
                                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-sanital-light/10 text-sanital-light">
                                        <Clock className="h-6 w-6" />
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Orari</h3>
                                    <p className="mt-1 text-gray-500 dark:text-gray-400">
                                        Lunedì - Venerdì: 09:00 - 18:00<br />
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Form Column */}
                    <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-2xl border border-gray-100 dark:border-gray-800 transition-colors">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Scrivici un messaggio</h2>
                        <form className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Nome e Cognome
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="mt-1 pt-2 pb-2 pl-2 focus:ring-sanital-light focus:border-sanital-light block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-md"
                                    placeholder="Mario Rossi"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="mt-1 pt-2 pb-2 pl-2 focus:ring-sanital-light focus:border-sanital-light block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-md"
                                    placeholder="mario@esempio.it"
                                />
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Oggetto
                                </label>
                                <select
                                    id="subject"
                                    name="subject"
                                    className="mt-1 pt-2 pb-2 pl-2 block w-full py-2 px-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-sanital-light focus:border-sanital-light sm:text-sm"
                                >
                                    <option>Informazioni Generali</option>
                                    <option>Richiesta Preventivo</option>
                                    <option>Assistenza Prodotti</option>
                                    <option>Candidatura</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Messaggio
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={4}
                                    className="mt-1 pt-2 pb-2 pl-2 focus:ring-sanital-light focus:border-sanital-light block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-md"
                                    placeholder="Come possiamo aiutarti?"
                                ></textarea>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sanital-light hover:bg-sanital-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sanital-light transition-colors"
                                >
                                    Invia Messaggio
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
