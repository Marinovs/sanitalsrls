'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Search, X } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { Product } from '../context/ProductContext';

interface SearchBarProps {
    showSuggestions?: boolean;
    placeholder?: string;
    className?: string;
}

export default function SearchBar({
    showSuggestions = false,
    placeholder = "Cerca prodotti...",
    className = ""
}: SearchBarProps) {
    const { products } = useProducts();
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState<Product[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    // Debounce logic could be added here, but for now simple effect is fine for local filtering
    useEffect(() => {
        if (!showSuggestions || query.length < 3) {
            setSuggestions([]);
            setIsOpen(false);
            return;
        }

        const lowerQuery = query.toLowerCase();
        const filtered = products.filter(p =>
            p.name.toLowerCase().includes(lowerQuery) ||
            p.description.toLowerCase().includes(lowerQuery)
        ).slice(0, 5); // Limit to 5 suggestions

        setSuggestions(filtered);
        setIsOpen(filtered.length > 0);
    }, [query, products, showSuggestions]);

    // Handle outside click to close suggestions
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setIsOpen(false);
        if (query.trim()) {
            router.push(`/products?search=${encodeURIComponent(query)}`);
        }
    };

    const clearSearch = () => {
        setQuery('');
        setSuggestions([]);
        setIsOpen(false);
    };

    return (
        <div ref={wrapperRef} className={`relative w-full ${className}`}>
            <form onSubmit={handleSearch} className="relative">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={placeholder}
                    className="w-full pl-10 pr-10 py-3 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm focus:ring-2 focus:ring-sanital-light focus:border-transparent outline-none transition-all"
                />
                <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />

                {query && (
                    <button
                        type="button"
                        onClick={clearSearch}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 transition-colors"
                    >
                        <X className="h-4 w-4" />
                    </button>
                )}
            </form>

            {/* Suggestions Dropdown */}
            {isOpen && showSuggestions && (
                <div className="absolute z-50 w-full mt-2 bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    <ul className="max-h-[60vh] overflow-y-auto">
                        {suggestions.map((product) => (
                            <li key={product._id} className="border-b border-gray-50 dark:border-gray-800 last:border-none">
                                <Link
                                    href={`/products/${product._id}`}
                                    className="flex items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <div className="relative h-12 w-12 rounded-lg overflow-hidden bg-gray-100 shrink-0 border border-gray-200 dark:border-gray-700">
                                        {/* Fallback image logic could be improved here */}
                                        <Image
                                            src={product.img || '/placeholder.png'}
                                            alt={product.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="ml-3 flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                                            {product.name}
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                            {product.category}
                                        </p>
                                    </div>
                                    <div className="ml-2 text-sm font-semibold text-sanital-light">
                                        €{product.price.toFixed(2)}
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className="p-2 bg-gray-50 dark:bg-gray-800/50 text-center border-t border-gray-100 dark:border-gray-800">
                        <button
                            onClick={handleSearch}
                            className="text-xs font-semibold text-sanital-light hover:underline"
                        >
                            Vedi tutti i risultati per "{query}"
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
