'use client';

import React from 'react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { X, Trash2, Plus, Minus, MessageCircle, Mail, ShoppingBag, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function CartSidebar() {
    const { items, isOpen, setIsOpen, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
    const { t } = useLanguage();

    if (!isOpen) return null;

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(val);
    };

    const generateOrderMessage = () => {
        let message = `${t('cart.orderMessage')}\n\n`;
        items.forEach(item => {
            message += `- ${item.product.name} (x${item.quantity})\n`;
        });
        message += `\n${t('cart.estimatedTotal')}: ${formatCurrency(totalPrice)}`;
        return encodeURIComponent(message);
    };

    const handleWhatsAppCheckout = () => {
        const message = generateOrderMessage();
        const phoneNumber = "393288699232"; // Sanital number
        window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    };

    const handleEmailCheckout = () => {
        const message = generateOrderMessage();
        const email = "sanitalsrls@gmail.com";
        const subject = encodeURIComponent(t('cart.newOrderSubject'));
        window.location.href = `mailto:${email}?subject=${subject}&body=${message}`;
    };

    return (
        <div className="fixed inset-0 z-100 overflow-hidden">
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
                onClick={() => setIsOpen(false)}
            />

            <div className="fixed inset-y-0 right-0 flex max-w-full pl-0 sm:pl-10 pointer-events-none">
                <div className="w-screen max-w-md transform transition-transform duration-300 ease-in-out pointer-events-auto bg-white dark:bg-gray-900 shadow-2xl flex flex-col h-dvh border-l border-gray-100 dark:border-gray-800">

                    {/* Header */}
                    <div className="px-6 py-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-white dark:bg-gray-900 z-10">
                        <div className="flex items-center gap-3">
                            <div className="bg-sanital-light/10 p-2 rounded-full">
                                <ShoppingBag className="h-5 w-5 text-sanital-light" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t('cart.title')}</h2>
                        </div>
                        <button
                            type="button"
                            className="p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-300 transition-all"
                            onClick={() => setIsOpen(false)}
                        >
                            <span className="sr-only">{t('cart.close')}</span>
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto px-6 py-6 bg-gray-50/50 dark:bg-gray-900">
                        {items.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                                <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                                    <ShoppingBag className="h-10 w-10 text-gray-300 dark:text-gray-600" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">{t('cart.empty')}</h3>
                                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 max-w-xs mx-auto">
                                        {t('cart.emptyDesc')}
                                    </p>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-full text-white bg-sanital-light hover:bg-sanital-dark transition-colors shadow-lg hover:shadow-sanital-light/20"
                                >
                                    {t('cart.startShopping')}
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </button>
                            </div>
                        ) : (
                            <ul className="space-y-6">
                                {items.map((item) => (
                                    <li key={item.product._id} className="group bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:border-sanital-light/30 transition-all duration-200">
                                        <div className="flex gap-4">
                                            <div className="h-24 w-24 shrink-0 overflow-hidden rounded-lg border border-gray-100 dark:border-gray-700 bg-white">
                                                <Image
                                                    src={item.product.img || '/logo.png'}
                                                    alt={item.product.name}
                                                    width={96}
                                                    height={96}
                                                    className="h-full w-full object-contain p-2"
                                                />
                                            </div>

                                            <div className="flex flex-1 flex-col justify-between">
                                                <div>
                                                    <div className="flex justify-between items-start">
                                                        <Link href={`/products/${item.product._id}`} onClick={() => setIsOpen(false)}>
                                                            <h3 className="text-base font-semibold text-gray-900 dark:text-white hover:text-sanital-light line-clamp-2 leading-tight">
                                                                {item.product.name}
                                                            </h3>
                                                        </Link>
                                                        <p className="ml-2 text-base font-bold text-gray-900 dark:text-white whitespace-nowrap">
                                                            {formatCurrency(item.product.price * item.quantity)}
                                                        </p>
                                                    </div>
                                                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 font-medium bg-gray-100 dark:bg-gray-700 inline-block px-2 py-0.5 rounded-full">
                                                        {item.product.category}
                                                    </p>
                                                </div>

                                                <div className="flex items-center justify-between mt-4">
                                                    <div className="flex items-center border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-900">
                                                        <button
                                                            onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                                                            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors"
                                                            disabled={item.quantity <= 1}
                                                        >
                                                            <Minus className="h-3 w-3" />
                                                        </button>
                                                        <span className="px-3 py-1 text-sm font-semibold text-gray-900 dark:text-white min-w-8 text-center">
                                                            {item.quantity}
                                                        </span>
                                                        <button
                                                            onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                                                            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors"
                                                        >
                                                            <Plus className="h-3 w-3" />
                                                        </button>
                                                    </div>

                                                    <button
                                                        type="button"
                                                        onClick={() => removeFromCart(item.product._id)}
                                                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                                                        title="Rimuovi prodotto"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Footer / Checkout */}
                    {items.length > 0 && (
                        <div className="border-t border-gray-100 dark:border-gray-800 px-6 py-6 bg-white dark:bg-black shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                            <div className="flex justify-between items-baseline mb-2">
                                <p className="text-gray-500 dark:text-gray-400 text-sm">{t('cart.totalProducts')}</p>
                                <p className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                                    {formatCurrency(totalPrice)}
                                </p>
                            </div>
                            <p className="text-xs text-gray-400 dark:text-gray-500 mb-6 text-right">
                                {t('cart.taxIncluded')}
                            </p>

                            <div className="space-y-3">
                                <Link
                                    href="/checkout"
                                    onClick={() => setIsOpen(false)}
                                    className="group w-full flex items-center justify-center rounded-xl bg-sanital-light hover:bg-sanital-dark px-6 py-3.5 text-base font-bold text-white shadow-lg hover:shadow-sanital-light/30 transition-all duration-300 transform hover:-translate-y-0.5"
                                >
                                    {t('cart.checkout')}
                                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                </Link>

                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        onClick={handleWhatsAppCheckout}
                                        className="w-full flex items-center justify-center rounded-xl border border-[#25D366] bg-[#25D366]/10 hover:bg-[#25D366]/20 px-4 py-2.5 text-sm font-semibold text-[#128C7E] dark:text-[#25D366] transition-colors"
                                    >
                                        <MessageCircle className="h-4 w-4 mr-2" />
                                        {t('cart.whatsapp')}
                                    </button>
                                    <button
                                        onClick={handleEmailCheckout}
                                        className="w-full flex items-center justify-center rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 px-4 py-2.5 text-sm font-semibold text-gray-700 dark:text-gray-300 transition-colors"
                                    >
                                        <Mail className="h-4 w-4 mr-2" />
                                        {t('cart.email')}
                                    </button>
                                </div>

                                <div className="pt-2 text-center">
                                    <button
                                        onClick={clearCart}
                                        className="text-xs text-red-500 hover:text-red-600 font-medium hover:underline transition-colors"
                                    >
                                        {t('cart.clear')}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
