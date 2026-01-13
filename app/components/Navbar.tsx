'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Phone, User, ShoppingBag, Sun, Moon } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useCart } from '../context/CartContext';


import { useAuth } from '../context/AuthContext';
import Image from 'next/image';

import { useProducts } from '../context/ProductContext';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { setIsOpen: setIsCartOpen, totalItems } = useCart();
  const { user } = useAuth();
  const { products } = useProducts();

  // Extract unique categories for Mega Menu
  const categories = React.useMemo(() => {
    return Array.from(new Set(products.map(p => p.category).filter(Boolean))).sort();
  }, [products]);

  const navigation = [
    { name: 'Home', href: '/' },
    // 'Prodotti' removed from here to be handled manually
    { name: 'Chi Siamo', href: '/contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo Section */}
          <div className="shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="h-12 w-auto flex items-center justify-center transition-colors">
                <Image
                  src="/logo.png"
                  alt="Sanital Logo"
                  width={150} // Increased width for aspect ratio
                  height={50}
                  className="h-full w-auto object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-sanital-dark dark:text-white leading-none tracking-tight">SANITAL</span>
                <span className="text-xs text-sanital-grey dark:text-gray-400 font-medium tracking-widest uppercase hidden sm:block">Detergenza Industriale</span>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-600 dark:text-gray-300 hover:text-sanital-light dark:hover:text-white font-medium transition-colors"
            >
              Home
            </Link>

            {/* Mega Menu for Prodotti */}
            <div className="group relative">
              <Link
                href="/products"
                className="text-gray-600 dark:text-gray-300 hover:text-sanital-light dark:hover:text-white font-medium transition-colors inline-flex items-center gap-1"
              >
                Prodotti
              </Link>

              {/* Dropdown Panel */}
              <div className="absolute top-full left-0 w-64 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top translate-y-2 group-hover:translate-y-0 ease-out">
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                  <div className="p-4 flex flex-col gap-1">
                    <Link
                      href="/products"
                      className="px-4 py-2 text-sm font-semibold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors flex justify-between items-center"
                    >
                      Tutti i prodotti
                    </Link>
                    <div className="h-px bg-gray-100 dark:bg-gray-800 my-1"></div>
                    {categories.length > 0 ? (
                      categories.map(cat => (
                        <Link
                          key={cat}
                          href={`/products?category=${encodeURIComponent(cat)}`}
                          className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-sanital-light dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                        >
                          {cat}
                        </Link>
                      ))
                    ) : (
                      <span className="px-4 py-2 text-sm text-gray-400 italic">Nessuna categoria</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <Link
              href="/contact"
              className="text-gray-600 dark:text-gray-300 hover:text-sanital-light dark:hover:text-white font-medium transition-colors"
            >
              Chi Siamo
            </Link>
            {user?.role === 'admin' && (
              <Link
                href="/admin"
                className="text-red-600 hover:text-red-800 font-medium transition-colors"
              >
                Admin
              </Link>
            )}
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-gray-500 dark:text-gray-400 hover:text-sanital-light dark:hover:text-white transition-colors focus:outline-none"
              aria-label="Open Cart"
            >
              <ShoppingBag className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
                  {totalItems}
                </span>
              )}
            </button>

            <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-2"></div>

            <Link
              href="/contact"
              className="text-gray-400 dark:text-gray-400 hover:text-sanital-light dark:hover:text-white transition-colors"
            >
              <Phone className="h-5 w-5" />
            </Link>
            <Link
              href={user ? "/profile" : "/login"}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-sanital-dark rounded-full hover:bg-sanital-light shadow-lg hover:shadow-xl transition-all"
            >
              <User className="h-4 w-4" />
              <span>{user ? 'Profilo' : 'Area Clienti'}</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <ThemeToggle />

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-gray-500 dark:text-gray-400 hover:text-sanital-light dark:hover:text-white transition-colors"
            >
              <ShoppingBag className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
                  {totalItems}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sanital-light"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-60 bg-white dark:bg-black flex flex-col pt-4 overflow-y-auto min-h-screen">
          <div className="flex justify-end px-4 sm:px-6 mb-8">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white"
            >
              <X className="h-8 w-8" />
            </button>
          </div>

          <div className="flex flex-col items-center justify-center space-y-8 flex-1 pb-20">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-3xl font-bold text-gray-900 dark:text-white hover:text-sanital-light dark:hover:text-sanital-light transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/products"
              className="text-3xl font-bold text-gray-900 dark:text-white hover:text-sanital-light dark:hover:text-sanital-light transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Prodotti
            </Link>
            {user?.role === 'admin' && (
              <Link
                href="/admin"
                className="text-xl font-bold text-red-600 hover:text-red-500"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Admin Panel
              </Link>
            )}

            <div className="w-16 h-1 bg-gray-100 dark:bg-gray-800 rounded-full my-4"></div>

            <Link
              href={user ? "/profile" : "/login"}
              className="flex items-center gap-3 px-8 py-4 text-xl font-medium text-white bg-sanital-dark rounded-full hover:bg-sanital-light shadow-xl hover:shadow-2xl transition-all"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <User className="h-6 w-6" />
              <span>{user ? 'Profilo' : 'Area Clienti'}</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
