'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';
import { Filter, SlidersHorizontal } from 'lucide-react';

import { useSearchParams } from 'next/navigation';

export default function Catalog() {
    const { products } = useProducts();
    const searchParams = useSearchParams();

    // Initialize category from URL param or default to 'All'
    const initialCategory = searchParams.get('category') || 'All';
    const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
    const [showFilters, setShowFilters] = useState(false);

    // Update state if URL param changes
    React.useEffect(() => {
        const cat = searchParams.get('category');
        if (cat) setSelectedCategory(cat);
    }, [searchParams]);

    // Extract unique categories
    const categories = useMemo(() => {
        const cats = new Set(products.map(p => p.category).filter(Boolean));
        return ['All', ...Array.from(cats).sort()];
    }, [products]);

    const filteredProducts = useMemo(() => {
        if (selectedCategory === 'All') return products;
        return products.filter(p => p.category === selectedCategory);
    }, [products, selectedCategory]);

    if (products.length === 0) {
        return (
            <div className="min-h-[50vh] flex flex-col items-center justify-center p-8 bg-white dark:bg-black transition-colors">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Il catalogo è vuoto</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-8">Nessun prodotto disponibile al momento.</p>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 dark:bg-black min-h-screen py-12 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">Catalogo Prodotti</h1>
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                            {filteredProducts.length} prodotti trovati
                        </p>
                    </div>

                    {/* Mobile Filter Toggle */}
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="mt-4 md:hidden flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                        <Filter className="mr-2 h-4 w-4" /> Filtri
                    </button>
                </div>

                <div className="flex flex-col md:flex-row gap-8">

                    {/* Sidebar Filters */}
                    <aside className={`md:w-64 shrink-0 ${showFilters ? 'block' : 'hidden md:block'}`}>
                        <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800 sticky top-24">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
                                    <SlidersHorizontal className="mr-2 h-4 w-4" /> Categorie
                                </h3>
                            </div>
                            <ul className="space-y-2">
                                {categories.map((category) => (
                                    <li key={category}>
                                        <button
                                            onClick={() => setSelectedCategory(category)}
                                            className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${selectedCategory === category
                                                ? 'bg-sanital-light text-white'
                                                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-sanital-light dark:hover:text-sanital-light'
                                                }`}
                                        >
                                            {category} <span className="text-xs opacity-70 ml-1">
                                                ({category === 'All' ? products.length : products.filter(p => p.category === category).length})
                                            </span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>

                    {/* Product Grid */}
                    <div className="flex-1">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
