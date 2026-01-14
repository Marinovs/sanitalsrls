'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-gray-50 dark:bg-black border-t border-gray-100 dark:border-gray-800 pt-12 pb-8 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Brand Info */}
                    <div>
                        <h3 className="text-lg font-bold text-sanital-dark dark:text-sanital-light mb-4">SANITAL S.r.l.s.</h3>
                        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6">
                            Il tuo partner affidabile per la detergenza industriale e professionale.
                            Qualità, efficienza e servizio al cliente sono la nostra priorità.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-sanital-light dark:hover:text-white transition-colors">
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-sanital-light dark:hover:text-white transition-colors">
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-sanital-light dark:hover:text-white transition-colors">
                                <Linkedin className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase mb-4">Navigazione</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/" className="text-base text-gray-500 dark:text-gray-400 hover:text-sanital-light dark:hover:text-white transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/products" className="text-base text-gray-500 dark:text-gray-400 hover:text-sanital-light dark:hover:text-white transition-colors">
                                    Catalogo Prodotti
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-base text-gray-500 dark:text-gray-400 hover:text-sanital-light dark:hover:text-white transition-colors">
                                    Chi Siamo
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-base text-gray-500 dark:text-gray-400 hover:text-sanital-light dark:hover:text-white transition-colors">
                                    Contatti e Assistenza
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase mb-4">Contatti</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start">
                                <MapPin className="h-6 w-6 text-sanital-light shrink-0 mr-3" />
                                <span className="text-gray-500 dark:text-gray-400 text-sm">
                                    Via Quercete 43<br />
                                    81016 San Potito Sannitico (CE), Italia
                                </span>
                            </li>
                            <li className="flex items-center">
                                <Phone className="h-5 w-5 text-sanital-light shrink-0 mr-3" />
                                <span className="text-gray-500 dark:text-gray-400 text-sm">+39 328 869 9232</span>
                            </li>
                            <li className="flex items-center">
                                <Mail className="h-5 w-5 text-sanital-light shrink-0 mr-3" />
                                <span className="text-gray-500 dark:text-gray-400 text-sm">sanitalsrls@gmail.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
                    <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 dark:text-gray-500">
                        <p>
                            &copy; {new Date().getFullYear()} Sanital S.r.l.s. Tutti i diritti riservati. P.IVA 04211370616
                        </p>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            <Link href="/privacy-policy" className="hover:text-sanital-light dark:hover:text-white transition-colors">
                                Privacy Policy
                            </Link>
                            <Link href="/cookie-policy" className="hover:text-sanital-light dark:hover:text-white transition-colors">
                                Cookie Policy
                            </Link>
                            <a href="https://www.iubenda.com" target="_blank" rel="noreferrer" className="hover:text-sanital-light dark:hover:text-white transition-colors">
                                Legal
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
