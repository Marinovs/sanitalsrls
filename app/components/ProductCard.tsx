'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '../context/ProductContext';
import { ArrowRight, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const { addToCart } = useCart();

    return (
        <div className="group bg-white dark:bg-gray-900 rounded-2xl p-4 transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-800 hover:border-sanital-light/20 flex flex-col h-full relative overflow-hidden">

            {/* Discount Badge Placeholder / Category */}
            <div className="absolute top-4 left-4 z-10">
                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-xs font-semibold text-gray-600 dark:text-gray-300 rounded-md uppercase tracking-wide">
                    {product.category}
                </span>
            </div>

            {/* Image Container */}
            <div className="relative h-48 w-full mb-4 rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-800 flex items-center justify-center group-hover:bg-white dark:group-hover:bg-gray-700 transition-colors">
                <div className="relative w-full h-full">
                    <Image
                        src={product.img ? `/products/${product.img}` : '/logo.png'} // Fallback logic
                        alt={product.name}
                        fill
                        className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                    />
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-col grow">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-sanital-dark dark:group-hover:text-sanital-light transition-colors line-clamp-2 mb-2">
                    {product.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4 grow">
                    {product.description}
                </p>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50 dark:border-gray-800 gap-2">
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-400">Prezzo</span>
                        <span className="text-xl font-bold text-sanital-light">
                            € {product.price}
                        </span>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={(e) => {
                                e.preventDefault(); // Prevent navigation to detail
                                addToCart(product);
                            }}
                            className="w-10 h-10 rounded-full bg-sanital-light/10 flex items-center justify-center text-sanital-light hover:bg-sanital-light hover:text-white transition-all duration-300"
                            title="Aggiungi al carrello"
                        >
                            <ShoppingCart className="h-5 w-5" />
                        </button>

                        <Link
                            href={`/products/${product.id}`}
                            className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 group-hover:bg-sanital-light group-hover:text-white transition-all duration-300 shadow-sm"
                        >
                            <ArrowRight className="h-5 w-5" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
