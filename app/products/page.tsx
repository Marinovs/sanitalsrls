'use client';

import React, { useState, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useProducts } from '../context/ProductContext';
import { useLanguage } from '../context/LanguageContext';
import ProductCard from '../components/ProductCard';
import { Filter, SlidersHorizontal, Loader2 } from 'lucide-react';
import SearchBar from '../components/SearchBar';

import { useSearchParams } from 'next/navigation';

function CatalogContent() {
    const { products } = useProducts();
    const { t } = useLanguage();
    const searchParams = useSearchParams();

    // Initialize category from URL param or default to 'All'
    const initialCategory = searchParams.get('category') || 'All';
    // Initialize search query from URL param
    const initialSearch = searchParams.get('search') || '';

    const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
    const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
    const [showFilters, setShowFilters] = useState(false);

    // Update state if URL param changes
    React.useEffect(() => {
        const cat = searchParams.get('category');
        if (cat) setSelectedCategory(cat);

        const search = searchParams.get('search');
        setSearchQuery(search || '');
    }, [searchParams]);

    // Extract unique categories
    const categories = useMemo(() => {
        const cats = new Set(products.map(p => p.category).filter(Boolean));
        return ['All', ...Array.from(cats).sort()];
    }, [products]);

    const filteredProducts = useMemo(() => {
        let result = products;

        // Filter by category
        if (selectedCategory !== 'All') {
            result = result.filter(p => p.category === selectedCategory);
        }

        // Filter by search query
        if (searchQuery) {
            const lowerQuery = searchQuery.toLowerCase();
            result = result.filter(p =>
                p.name.toLowerCase().includes(lowerQuery) ||
                p.description.toLowerCase().includes(lowerQuery)
            );
        }

        return result;
    }, [products, selectedCategory, searchQuery]);

    if (products.length === 0) {
        return (
            <div className="min-h-[50vh] flex flex-col items-center justify-center p-8 bg-white dark:bg-black transition-colors">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('catalog.empty')}</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-8">{t('catalog.emptyDesc')}</p>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 dark:bg-black min-h-screen py-12 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">{t('catalog.title')}</h1>
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                            {filteredProducts.length} {t('catalog.productsFound')}
                        </p>
                    </div>

                    <div className="mt-4 md:mt-0 md:w-1/3">
                        <SearchBar showSuggestions={false} placeholder={t('Cerca prodotti...') || "Cerca prodotti..."} />
                    </div>

                    {/* Mobile Filter Toggle */}
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="mt-4 md:hidden flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                        <Filter className="mr-2 h-4 w-4" /> {t('catalog.filters')}
                    </button>
                </div>

                <div className="flex flex-col md:flex-row gap-8">

                    {/* Sidebar Filters */}
                    <aside className={`md:w-64 shrink-0 ${showFilters ? 'block' : 'hidden md:block'}`}>
                        <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800 sticky top-24">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
                                    <SlidersHorizontal className="mr-2 h-4 w-4" /> {t('catalog.categories')}
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
                                            {category === 'All' ? t('catalog.allCategories') : category} <span className="text-xs opacity-70 ml-1">
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
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default function Catalog() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black">
                <Loader2 className="h-8 w-8 animate-spin text-sanital-light" />
            </div>
        }>
            <CatalogContent />
        </Suspense>
    );
}
