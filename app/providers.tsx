'use client';

import * as React from 'react';
import { ThemeProvider } from 'next-themes';
import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { useEffect, useState } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);


    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <AuthProvider>
                <ProductProvider>
                    <CartProvider>
                        {children}
                    </CartProvider>
                </ProductProvider>
            </AuthProvider>
        </ThemeProvider>
    );
}
