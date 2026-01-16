'use client';

'use client';

import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import { useProducts } from "./context/ProductContext";
import ProductCard from "./components/ProductCard";
import SearchBar from "./components/SearchBar";
import { useState } from "react";

export default function Home() {
  const { products } = useProducts();

  // Take first 4 products as featured
  const featuredProducts = products.filter((p) => p.onHomepage).slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen">

      {/* HERO SECTION */}
      <section className="relative bg-white dark:bg-black overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"></div>
        <div className="absolute inset-0 bg-blue-50 dark:bg-blue-900/10 opacity-50 skew-y-3 origin-top-left transform -translate-y-20 h-full"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32 relative">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto z-10">

            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-sanital-light/10 text-sanital-light text-sm font-semibold mb-8 border border-sanital-light/20">
              <span className="flex h-2 w-2 rounded-full bg-sanital-light mr-2 animate-pulse"></span>
              Detergenza Professionale
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight mb-8">
              Qualità e Igiene <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-sanital-light to-blue-600">Senza Compromessi.</span>
            </h1>

            <p className="text-xl text-gray-500 dark:text-gray-300 max-w-2xl leading-relaxed mb-10">
              Soluzioni avanzate per la pulizia industriale e civile.
              Prodotti certificati per garantire il massimo risultato, rispettando l'ambiente.
            </p>

            <div className="w-full max-w-lg mx-auto mb-10">
              <SearchBar showSuggestions={true} className="shadow-lg shadow-blue-500/10" />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center w-full">
              <Link
                href="/products"
                className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-full text-white bg-sanital-light hover:bg-sanital-dark transition-all duration-300 shadow-lg hover:shadow-sanital-light/30 transform hover:-translate-y-1"
              >
                Scopri i Prodotti
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 border border-gray-200 dark:border-gray-700 text-lg font-medium rounded-full text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 backdrop-blur-sm"
              >
                Contattaci
              </Link>
            </div>

            <div className="pt-12 flex justify-center items-center space-x-8 text-sm font-medium text-gray-500 dark:text-gray-400">
              <div className="flex items-center">
                <div className="bg-green-100 dark:bg-green-900/30 p-1 rounded-full mr-2">
                  <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
                Spedizioni Rapide
              </div>
              <div className="flex items-center">
                <div className="bg-green-100 dark:bg-green-900/30 p-1 rounded-full mr-2">
                  <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
                Qualità Certificata
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
                <ProductCard key={product._id} product={product} />
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
