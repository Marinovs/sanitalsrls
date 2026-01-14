'use client';

import { useState, use, useEffect } from 'react';
import Link from 'next/link';
import { useProducts } from '../../context/ProductContext';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../context/LanguageContext';
import { ArrowLeft, Check, ShieldCheck, Truck, ShoppingCart, Plus, Minus } from 'lucide-react';
import Image from 'next/image';

// Fix for Next.js 15+ dynamic params handling which requires unwrapping
export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
    // Unwrap params using React.use()
    const resolvedParams = use(params);
    const { id } = resolvedParams;

    const { products } = useProducts();
    const { addToCart } = useCart();
    const { t } = useLanguage();

    const [product, setProduct] = useState<any>(null);
    const [activeImage, setActiveImage] = useState<string>('');
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        if (products.length > 0) {
            const found = products.find(p => p._id === id);
            setProduct(found);
            if (found) {
                setActiveImage(found.img);
            }
        }
    }, [products, id]);

    const handleAddToCart = () => {
        if (product) {
            addToCart(product, quantity);
        }
    };

    if (!product && products.length === 0) {
        return <div className="p-8 text-center">Loading or No Products... Check CSV load status.</div>;
    }

    if (!product) {
        return <div className="p-8 text-center">{t('product.notFound')}</div>;
    }

    const images = [
        product.img,
        product.img1,
        product.img2,
        product.img3,
        product.img4,
    ].filter(Boolean);

    return (
        <div className="bg-white dark:bg-black min-h-screen py-12 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link href="/products" className="inline-flex items-center text-gray-500 dark:text-gray-400 hover:text-sanital-dark dark:hover:text-white mb-8">
                    <ArrowLeft className="mr-2 h-4 w-4" /> {t('product.backToCatalog')}
                </Link>

                <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 lg:items-start">

                    {/* Image Gallery */}
                    <div className="flex flex-col gap-4">
                        <div className="relative w-full aspect-square rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 overflow-hidden flex items-center justify-center p-8">
                            <div className="relative w-full h-full">
                                <Image
                                    src={activeImage ? (activeImage.startsWith('http') ? activeImage : `${process.env.NEXT_PUBLIC_API_URL}${activeImage}`) : '/logo.png'}
                                    alt={product.name}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>

                        {images.length > 1 && (
                            <div className="grid grid-cols-4 gap-4">
                                {images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveImage(img)}
                                        className={`relative aspect-square rounded-lg border-2 bg-gray-50 dark:bg-gray-900 overflow-hidden
                      ${activeImage === img ? 'border-sanital-light' : 'border-transparent hover:border-gray-200 dark:hover:border-gray-700'}
                    `}
                                    >
                                        <Image
                                            src={img ? (img.startsWith('http') ? img : `${process.env.NEXT_PUBLIC_API_URL}${img}`) : '/logo.png'}
                                            alt="Product view"
                                            fill
                                            className="object-contain p-2"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="mt-10 px-2 sm:px-0 sm:mt-16 lg:mt-0">
                        <div className="mb-6">
                            <span className="text-sanital-light font-medium tracking-wide text-sm uppercase">
                                {product.category}
                            </span>
                            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mt-2">{product.name}</h1>
                            <div className="mt-3">
                                <p className="text-3xl tracking-tight text-gray-900 dark:text-white font-bold">€ {product.price}</p>
                            </div>
                        </div>

                        <div className="prose prose-sm text-gray-500 dark:text-gray-400 mb-8">
                            <p>{product.description}</p>
                        </div>

                        <div className="border-t border-gray-100 dark:border-gray-800 pt-8">
                            <h3 className="text-sm font-medium text-gray-900 dark:text-white">{t('product.whyChoose')}</h3>
                            <div className="mt-4 space-y-3">
                                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                    <Check className="shrink-0 h-5 w-5 text-green-500 mr-2" />
                                    {t('product.availability')}
                                </div>
                                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                    <ShieldCheck className="shrink-0 h-5 w-5 text-sanital-light mr-2" />
                                    {t('product.quality')}
                                </div>
                                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                    <Truck className="shrink-0 h-5 w-5 text-gray-400 mr-2" />
                                    {t('product.shipping')}
                                </div>
                            </div>
                        </div>

                        {/* Add to Cart Section */}
                        <div className="mt-10 border-t border-gray-100 dark:border-gray-800 pt-8">
                            <div className="flex items-center mb-6">
                                <span className="mr-4 text-sm font-medium text-gray-900 dark:text-white">{t('product.quantity')}:</span>
                                <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
                                    >
                                        <Minus className="h-4 w-4" />
                                    </button>
                                    <span className="px-4 font-medium text-gray-900 dark:text-white">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
                                    >
                                        <Plus className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <button
                                    onClick={handleAddToCart}
                                    className="flex-1 bg-sanital-light border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-sanital-blue-dark transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sanital-light shadow-lg hover:shadow-xl"
                                >
                                    <ShoppingCart className="mr-2 h-5 w-5" />
                                    {t('product.addToCart')}
                                </button>
                                <Link
                                    href={`mailto:info@sanitalsrls.it?subject=Info Prodotto: ${product.name}`}
                                    className="flex-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sanital-light"
                                >
                                    {t('product.requestInfo')}
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
