'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    img: string;
    img1?: string;
    img2?: string;
    img3?: string;
    img4?: string;
    onHomepage?: boolean;
}

interface ProductContextType {
    products: Product[];
    setProducts: (products: Product[]) => void;
    loadProductsFromCsv: (csvData: any[]) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: React.ReactNode }) {
    const [products, setProducts] = useState<Product[]>([]);

    // Load products from API on mount
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get('/products');
                // The API returns an array of products directly or data: products
                // Adjust based on your NestJS controller response
                setProducts(response.data);
            } catch (error) {
                console.error("Failed to fetch products from API", error);
            }
        };

        fetchProducts();
    }, []);

    // Helper for optimistic UI updates or re-fetch trigger
    const refreshProducts = async () => {
        try {
            const response = await api.get('/products');
            setProducts(response.data);
        } catch (error) {
            console.error("Failed to refresh products", error);
        }
    };

    const loadProductsFromCsv = (csvData: any[]) => {
        // This function signature in the context might need to change or be deprecated
        // since we are now uploading via API in the component. 
        // However, to keep type compatibility or use it as a 'refresh' trigger:
        refreshProducts();
    };

    return (
        <ProductContext.Provider value={{ products, setProducts, loadProductsFromCsv }}>
            {children}
        </ProductContext.Provider>
    );
}

export function useProducts() {
    const context = useContext(ProductContext);
    if (context === undefined) {
        throw new Error('useProducts must be used within a ProductProvider');
    }
    return context;
}
