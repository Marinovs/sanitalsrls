'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import api from '../services/api';
import { User, Shield, LogOut } from 'lucide-react';

export default function ProfilePage() {
    const { user, isAuthenticated, isLoading, logout } = useAuth();
    const { t } = useLanguage();
    const router = useRouter();

    const [orders, setOrders] = React.useState<any[]>([]);
    const [loadingOrders, setLoadingOrders] = React.useState(true);

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push('/login');
        } else if (isAuthenticated && user) {
            // Fetch orders
            api.get(`/orders?userId=${user._id}`)
                .then(res => {
                    setOrders(res.data);
                })
                .catch(err => console.error("Failed to fetch orders", err))
                .finally(() => setLoadingOrders(false));
        }
    }, [isLoading, isAuthenticated, router, user]);

    if (isLoading || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sanital-light"></div>
            </div>
        );
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('it-IT', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(val);
    };

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'completed':
            case 'delivered':
                return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
            case 'processing':
            case 'shipped':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
            case 'cancelled':
                return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
            default:
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
            <div className="max-w-5xl mx-auto space-y-8">
                {/* Profile Info */}
                <div className="bg-white dark:bg-gray-900 shadow rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800">
                    <div className="px-4 py-5 sm:px-6 flex justify-between items-center bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-800">
                        <div>
                            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                                {t('profile.title')}
                            </h3>
                            <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
                                {t('profile.subtitle')}
                            </p>
                        </div>
                        <button
                            onClick={logout}
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                        >
                            <LogOut className="mr-2 h-4 w-4" />
                            {t('common.logout')}
                        </button>
                    </div>
                    <div className="px-4 py-5 sm:p-6">
                        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                            <div className="sm:col-span-1">
                                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    {t('common.email')}
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 dark:text-white flex items-center">
                                    <User className="mr-2 h-4 w-4 text-sanital-light" />
                                    {user.email}
                                </dd>
                            </div>
                            <div className="sm:col-span-1">
                                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    {t('profile.role')}
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 dark:text-white flex items-center capitalize">
                                    <Shield className="mr-2 h-4 w-4 text-sanital-light" />
                                    {user.role}
                                </dd>
                            </div>
                            <div className="sm:col-span-2">
                                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    {t('profile.userId')}
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 dark:text-white font-mono bg-gray-100 dark:bg-gray-800 p-2 rounded">
                                    {user._id}
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>

                {/* Order History */}
                <div className="bg-white dark:bg-gray-900 shadow rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800">
                    <div className="px-4 py-5 sm:px-6 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-800">
                        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                            {t('profile.ordersTitle')}
                        </h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
                            {t('profile.ordersSubtitle')}
                        </p>
                    </div>
                    <div className="overflow-x-auto">
                        {loadingOrders ? (
                            <div className="p-8 text-center">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sanital-light mx-auto"></div>
                                <p className="mt-2 text-sm text-gray-500">{t('common.loading')}</p>
                            </div>
                        ) : orders.length === 0 ? (
                            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                                {t('profile.noOrders')}
                            </div>
                        ) : (
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                                <thead className="bg-gray-50 dark:bg-black">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            {t('profile.orderId')}
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            {t('profile.date')}
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            {t('cart.total')}
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            {t('profile.status')}
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            {t('profile.payment')}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                                    {orders.map((order) => (
                                        <tr key={order._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white font-mono">
                                                #{order._id.slice(-6)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                                {formatDate(order.created_at || order.createdAt)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 dark:text-white">
                                                {formatCurrency(order.financials?.grandTotal || order.totalAmount || 0)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)} capitalize`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 capitalize">
                                                {order.payment?.method?.replace('_', ' ') || '-'}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
