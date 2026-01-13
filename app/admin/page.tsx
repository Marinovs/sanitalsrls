'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { useProducts, Product } from '../context/ProductContext';
import CsvUploader from '../components/CsvUploader';
import ProductEditorModal from '../components/ProductEditorModal';
import { ShieldAlert, LayoutDashboard, LogOut, Search, Edit, Package, ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';
import api from '../services/api';

export default function AdminDashboard() {
    const { user, isAuthenticated, isLoading, logout } = useAuth();
    const { products, setProducts } = useProducts(); // Assuming setProducts or a refresh function is available. Ideally use a refresh method.
    // If setProducts only updates local state, we need to ensure we re-fetch. 
    // The ProductContext provided earlier has `loadProductsFromCsv` which calls `refreshProducts`.
    // Let's add a robust refresh mechanism or use the one if available. 
    // Checking previous context file, `loadProductsFromCsv` calls `refreshProducts`. We can use that.

    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [isUploadCollapsed, setIsUploadCollapsed] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('All');

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

    // Extract unique categories
    const categories = useMemo(() => {
        const cats = new Set(products.map(p => p.category).filter(Boolean));
        return ['All', ...Array.from(cats).sort()];
    }, [products]);

    const filteredProducts = useMemo(() => {
        let result = products;

        if (selectedCategory !== 'All') {
            result = result.filter(p => p.category === selectedCategory);
        }

        if (searchTerm) {
            const lowerTerm = searchTerm.toLowerCase();
            result = result.filter(p =>
                p.name.toLowerCase().includes(lowerTerm) ||
                p.category.toLowerCase().includes(lowerTerm) ||
                p.id.toLowerCase().includes(lowerTerm)
            );
        }

        return result;
    }, [products, searchTerm, selectedCategory]);

    const handleProductUnpdate = async () => {
        // Trigger a refresh of the product list
        try {
            // We can manually fetch and update context if specific refresh isn't exposed perfectly, 
            // or use loadProductsFromCsv([]) which triggers refreshProducts internally in the version I saw.
            const response = await api.get('/products');
            setProducts(response.data);
        } catch (error) {
            console.error("Failed to refresh products", error);
        }
    };

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
            <header className="bg-white dark:bg-black shadow-sm border-b border-gray-200 dark:border-gray-800 sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <LayoutDashboard className="h-6 w-6 text-sanital-light" />
                        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Pannello Amministratore</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-500 dark:text-gray-400 hidden sm:block">
                            {user?.email}
                        </span>
                        <button
                            onClick={logout}
                            className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 font-medium bg-red-50 dark:bg-red-900/10 px-3 py-1.5 rounded-md transition-colors"
                        >
                            <LogOut className="h-4 w-4" />
                            Esci
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

                {/* Collapsible Upload Section */}
                <div className="bg-white dark:bg-black rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
                    <button
                        onClick={() => setIsUploadCollapsed(!isUploadCollapsed)}
                        className="w-full flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
                    >
                        <div className="text-left">
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                <ShieldAlert className="h-5 w-5 text-sanital-light" />
                                Importazione Massiva
                            </h2>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                Carica un file CSV per aggiungere o aggiornare molti prodotti in una volta.
                            </p>
                        </div>
                        {isUploadCollapsed ? (
                            <ChevronDown className="h-5 w-5 text-gray-400" />
                        ) : (
                            <ChevronUp className="h-5 w-5 text-gray-400" />
                        )}
                    </button>

                    {!isUploadCollapsed && (
                        <div className="p-6 animate-slide-down">
                            <CsvUploader />
                        </div>
                    )}
                </div>

                {/* Product Management Section */}
                <div className="bg-white dark:bg-black rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
                    <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex flex-col items-start gap-4">
                        <div className="w-full flex justify-between items-center">
                            <div>
                                <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                    <Package className="h-5 w-5 text-sanital-light" />
                                    Gestione Prodotti ({filteredProducts.length})
                                </h2>
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                    Cerca e modifica i singoli prodotti del catalogo.
                                </p>
                            </div>
                        </div>

                        <div className="w-full flex flex-col sm:flex-row gap-4">
                            {/* Category Filter */}
                            <div className="relative w-full sm:w-48">
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-sanital-light focus:border-sanital-light sm:text-sm rounded-md shadow-sm"
                                >
                                    {categories.map((cat) => (
                                        <option key={cat} value={cat}>
                                            {cat === 'All' ? 'Tutte le categorie' : cat}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Search Bar */}
                            <div className="relative flex-1">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="h-4 w-4 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Cerca per nome, codice..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md leading-5 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-sanital-light focus:border-sanital-light sm:text-sm shadow-sm"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                            <thead className="bg-gray-50 dark:bg-gray-900">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Prodotto
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Categoria
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Prezzo
                                    </th>
                                    <th scope="col" className="relative px-6 py-3">
                                        <span className="sr-only">Azioni</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-black divide-y divide-gray-200 dark:divide-gray-800">
                                {filteredProducts.map((product) => (
                                    <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="h-10 w-10 shrink-0 overflow-hidden rounded bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                                                    <Image
                                                        src={"./products/" + product.img || '/file.svg'}
                                                        alt=""
                                                        width={40}
                                                        height={40}
                                                        className="h-full w-full object-contain"
                                                    />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900 dark:text-white line-clamp-1 max-w-xs">{product.name}</div>
                                                    <div className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1 max-w-xs">{product.description}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                                {product.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300 font-mono">
                                            € {product.price.toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button
                                                onClick={() => setEditingProduct(product)}
                                                className="text-sanital-light hover:text-sanital-dark dark:hover:text-white flex items-center justify-end gap-1 ml-auto"
                                            >
                                                <Edit className="h-4 w-4" />
                                                <span className="hidden sm:inline">Modifica</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {filteredProducts.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-10 text-center text-gray-500 dark:text-gray-400">
                                            Nessun prodotto trovato.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            {/* Edit Modal */}
            {editingProduct && (
                <ProductEditorModal
                    product={editingProduct}
                    onClose={() => setEditingProduct(null)}
                    onSave={handleProductUnpdate}
                />
            )}
        </div>
    );
}
