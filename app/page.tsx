'use client';

'use client';

import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import { useProducts } from "./context/ProductContext";
import ProductCard from "./components/ProductCard";
import { useState } from "react";

export default function Home() {
  const { products } = useProducts();

  // Take first 4 products as featured
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen">

      {/* HERO SECTION */}
      <section className="relative bg-white dark:bg-black overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 bg-blue-50 dark:bg-blue-900/10 opacity-50 skew-y-3 origin-top-left transform -translate-y-20 h-full"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            <div className="text-left space-y-6">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-sanital-light/10 text-sanital-light text-sm font-semibold mb-4">
                <span className="flex h-2 w-2 rounded-full bg-sanital-light mr-2"></span>
                Detergenza Professionale
              </div>
              <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight">
                Qualità e Igiene <br />
                <span className="text-sanital-light">Senza Compromessi.</span>
              </h1>
              <p className="text-lg text-gray-500 dark:text-gray-300 max-w-lg">
                Soluzioni avanzate per la pulizia industriale e civile.
                Prodotti certificati per garantire il massimo risultato.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-sanital-light hover:bg-sanital-dark transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Scopri i Prodotti
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-3 border border-gray-200 dark:border-gray-700 text-base font-medium rounded-full text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300"
                >
                  Contattaci
                </Link>
              </div>

              <div className="pt-8 flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  Spedizioni Rapide
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  Qualità Certificata
                </div>
              </div>
            </div>

            {/* Hero Image / Illustration Placeholder */}
            <div className="relative hidden lg:block">
              {/* Abstract shapes or Product Composition */}
              <div className="relative mx-auto w-full max-w-md">
                <div className="absolute top-0 -right-4 w-72 h-72 bg-sanital-light/20 rounded-full blur-3xl mix-blend-multiply filter opacity-70 animate-blob"></div>
                <div className="absolute -bottom-8 -left-4 w-72 h-72 bg-purple-300/20 rounded-full blur-3xl mix-blend-multiply filter opacity-70 animate-blob animation-delay-2000"></div>

                <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 border border-gray-100 dark:border-gray-800 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                  <div className="aspect-4/3 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center overflow-hidden">
                    <span className="text-gray-400 dark:text-gray-500 font-bold text-xl">PRODOTTI SANITAL</span>
                    {/* Ideally put a key product image here */}
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <div>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">Linea professionale</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Massima efficacia</p>
                    </div>
                    <button className="p-2 bg-sanital-light rounded-full text-white">
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="bg-gray-50 dark:bg-black py-24 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-sanital-light font-bold text-sm uppercase tracking-wider">Il nostro catalogo</span>
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mt-2">Prodotti in Evidenza</h2>
            </div>
            <Link href="/products" className="hidden sm:flex items-center text-sanital-dark dark:text-sanital-light font-semibold hover:text-sanital-light dark:hover:text-white transition-colors">
              Vedi tutto <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-gray-900 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
              <p className="text-gray-500 dark:text-gray-400 mb-4">Il catalogo è attualmente in aggiornamento.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts?.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {/* Mobile 'View All' */}
          <div className="mt-8 text-center sm:hidden">
            <Link href="/products" className="inline-flex items-center text-sanital-dark dark:text-sanital-light font-semibold hover:text-sanital-light dark:hover:text-white">
              Vedi tutti i prodotti <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
