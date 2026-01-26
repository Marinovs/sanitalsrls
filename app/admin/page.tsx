'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { useProducts, Product } from '../context/ProductContext';
import { useLanguage } from '../context/LanguageContext';
import CsvUploader from '../components/CsvUploader';
import ProductEditorModal from '../components/ProductEditorModal';
import { ShieldAlert, LayoutDashboard, LogOut, Search, Edit, Package, ChevronDown, ChevronUp, Plus } from 'lucide-react';
import Image from 'next/image';
import api from '../services/api';

export default function AdminDashboard() {
    const { user, isAuthenticated, isLoading, logout } = useAuth();
    const { t } = useLanguage();
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


    const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'users'>('products');
    const [orders, setOrders] = useState<any[]>([]);
    const [usersList, setUsersList] = useState<any[]>([]);

    const handleCreateProduct = () => {
        setEditingProduct({
            _id: '',
            name: '',
            description: '',
            price: 0,
            category: '',
            img: '',
            img1: '',
            img2: '',
            img3: '',
        });
    };

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

    // Fetch resources when tab changes
    useEffect(() => {
        if (!isAuthorized) return;
        if (!user) return;

        if (activeTab === 'orders' && orders.length === 0) {
            api.get('/orders').then(res => setOrders(res.data)).catch(console.error);
        }
        if (activeTab === 'users' && usersList.length === 0) {
            api.get('/users').then(res => setUsersList(res.data)).catch(console.error);
        }
    }, [activeTab, isAuthorized, orders.length, usersList.length]);

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
                p._id.toLowerCase().includes(lowerTerm)
            );
        }

        return result;
    }, [products, searchTerm, selectedCategory]);

    const handleProductUnpdate = async () => {
        try {
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

    const renderProductsTab = () => (
        <div className="bg-white dark:bg-black rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden animate-fade-in">
            <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex flex-col items-start gap-4">
                <div className="w-full flex justify-between items-center">
                    <div>
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <Package className="h-5 w-5 text-sanital-light" />
                            {t('admin.manageProducts')} ({filteredProducts.length})
                        </h2>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            {t('admin.productsDesc')}
                        </p>
                    </div>
                    <button
                        onClick={handleCreateProduct}
                        className="flex items-center gap-2 px-4 py-2 bg-sanital-light hover:bg-sanital-dark text-white rounded-lg transition-colors shadow-sm text-sm font-medium"
                    >
                        <Plus className="h-4 w-4" />
                        Aggiungi Prodotto
                    </button>
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
                                    {cat === 'All' ? t('admin.allCategories') : cat}
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
                            placeholder={t('admin.searchPlaceholder')}
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
                                {t('admin.product')}
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                {t('admin.category')}
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                {t('admin.price')}
                            </th>
                            <th scope="col" className="relative px-6 py-3">
                                <span className="sr-only">{t('admin.actions')}</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-black divide-y divide-gray-200 dark:divide-gray-800">
                        {filteredProducts.map((product) => (
                            <tr key={product._id} className="hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="h-10 w-10 shrink-0 overflow-hidden rounded bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                                            <Image
                                                src={product.img || '/file.svg'}
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
                                        <span className="hidden sm:inline">{t('common.edit')}</span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {filteredProducts.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-6 py-10 text-center text-gray-500 dark:text-gray-400">
                                    {t('common.noResults')}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div >
    );

    const renderOrdersTab = () => (
        <div className="bg-white dark:bg-black rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden animate-fade-in">
            <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <Package className="h-5 w-5 text-sanital-light" />
                    {t('admin.manageOrders')} ({orders.length})
                </h2>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {t('admin.ordersDesc')}
                </p>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                    <thead className="bg-gray-50 dark:bg-gray-900">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">{t('admin.user')}</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">{t('cart.total')}</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">{t('admin.status')}</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">{t('admin.payment')}</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-black divide-y divide-gray-200 dark:divide-gray-800">
                        {orders.map(order => (
                            <tr key={order._id} className="hover:bg-gray-50 dark:hover:bg-gray-900/50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono">{order._id.slice(-6)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">{order.shippingAddress?.email || (order.user && order.user.email) || '-'}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold">€ {order.financials?.grandTotal || 0}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">{order.status}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">{order.payment?.method}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const renderUsersTab = () => (
        <div className="bg-white dark:bg-black rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden animate-fade-in">
            <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <ShieldAlert className="h-5 w-5 text-sanital-light" />
                    {t('admin.manageUsers')} ({usersList.length})
                </h2>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {t('admin.usersDesc')}
                </p>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                    <thead className="bg-gray-50 dark:bg-gray-900">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">{t('common.email')}</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">{t('admin.role')}</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-black divide-y divide-gray-200 dark:divide-gray-800">
                        {usersList.map((u) => (
                            <tr key={u._id} className="hover:bg-gray-50 dark:hover:bg-gray-900/50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono">{u._id.slice(-6)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">{u.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm capitalize">{u.role}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            {/* Admin Header */}
            <header className="bg-white dark:bg-black shadow-sm border-b border-gray-200 dark:border-gray-800 sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <LayoutDashboard className="h-6 w-6 text-sanital-light" />
                        <h1 className="text-xl font-bold text-gray-900 dark:text-white">{t('admin.title')}</h1>
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
                            {t('common.logout')}
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

                {/* Navigation Tabs */}
                <div className="flex space-x-1 rounded-xl bg-gray-200 dark:bg-gray-800 p-1">
                    <button
                        onClick={() => setActiveTab('products')}
                        className={`w-full rounded-lg py-2.5 text-sm font-medium leading-5 transition-all
                            ${activeTab === 'products'
                                ? 'bg-white dark:bg-black text-sanital-dark shadow'
                                : 'text-gray-600 dark:text-gray-400 hover:bg-white/12 hover:text-sanital-light'
                            }`}
                    >
                        {t('admin.products')}
                    </button>
                    <button
                        onClick={() => setActiveTab('orders')}
                        className={`w-full rounded-lg py-2.5 text-sm font-medium leading-5 transition-all
                            ${activeTab === 'orders'
                                ? 'bg-white dark:bg-black text-sanital-dark shadow'
                                : 'text-gray-600 dark:text-gray-400 hover:bg-white/12 hover:text-sanital-light'
                            }`}
                    >
                        {t('admin.orders')}
                    </button>
                    <button
                        onClick={() => setActiveTab('users')}
                        className={`w-full rounded-lg py-2.5 text-sm font-medium leading-5 transition-all
                            ${activeTab === 'users'
                                ? 'bg-white dark:bg-black text-sanital-dark shadow'
                                : 'text-gray-600 dark:text-gray-400 hover:bg-white/12 hover:text-sanital-light'
                            }`}
                    >
                        {t('admin.users')}
                    </button>
                </div>

                {/* Collapsible Upload Section (Only on Products tab) */}
                {activeTab === 'products' && (
                    <div className="bg-white dark:bg-black rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden animate-fade-in">
                        <button
                            onClick={() => setIsUploadCollapsed(!isUploadCollapsed)}
                            className="w-full flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
                        >
                            <div className="text-left">
                                <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                    <ShieldAlert className="h-5 w-5 text-sanital-light" />
                                    {t('admin.csvImport')}
                                </h2>
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                    {t('admin.csvImportDesc')}
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
                )}

                {/* Tab Content */}
                {activeTab === 'products' && renderProductsTab()}
                {activeTab === 'orders' && renderOrdersTab()}
                {activeTab === 'users' && renderUsersTab()}

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
