'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from './ProductContext';

export interface CartItem {
    product: Product;
    quantity: number;
}

interface CartContextType {
    items: CartItem[];
    addToCart: (product: Product, quantity?: number) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    totalItems: number;
    totalPrice: number;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    // Load from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem('sanital_cart');
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                // Sanitize and validate data
                const validItems = parsed.map((item: any) => ({
                    ...item,
                    product: {
                        ...item.product,
                        // Force price to be a number, handling strings with '€' or ','
                        price: typeof item.product.price === 'string'
                            ? Number(item.product.price.replace(/[^0-9.,-]+/g, "").replace(',', '.'))
                            : Number(item.product.price) || 0
                    }
                })).filter((item: any) => item.product && item.product.id && !isNaN(item.product.price));

                setItems(validItems);
            } catch (e) {
                console.error("Failed to parse cart from local storage", e);
                localStorage.removeItem('sanital_cart');
            }
        }
    }, []);

    // Save to localStorage whenever items change
    useEffect(() => {
        if (items.length > 0) {
            localStorage.setItem('sanital_cart', JSON.stringify(items));
        }
    }, [items]);

    const addToCart = (product: Product, quantity = 1) => {
        setItems(prev => {
            const existing = prev.find(item => item.product.id === product.id);
            if (existing) {
                return prev.map(item =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prev, { product, quantity }];
        });
        setIsOpen(true); // Open cart when adding item
    };

    const removeFromCart = (productId: string) => {
        setItems(prev => prev.filter(item => item.product.id !== productId));
    };

    const updateQuantity = (productId: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        setItems(prev => prev.map(item =>
            item.product.id === productId ? { ...item, quantity } : item
        ));
    };

    const clearCart = () => {
        setItems([]);
    };

    const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

    const totalPrice = items.reduce((acc, item) => {
        const price = item.product.price || 0;
        return acc + (price * item.quantity);
    }, 0);

    return (
        <CartContext.Provider value={{
            items,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            totalItems,
            totalPrice,
            isOpen,
            setIsOpen
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
