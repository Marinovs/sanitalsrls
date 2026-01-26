'use client';

import React, { useState } from 'react';
import { Product } from '../context/ProductContext';
import { X, Save, Trash2, Image as ImageIcon, Upload } from 'lucide-react';
import api from '../services/api';
import Image from 'next/image';

interface ProductEditorModalProps {
    product: Product;
    onClose: () => void;
    onSave: () => void;
}

export default function ProductEditorModal({ product, onClose, onSave }: ProductEditorModalProps) {
    // Check if we are creating a new product (no ID)
    const isCreating = !product._id;
    const [formData, setFormData] = useState<Product>({ ...product });
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'price' ? parseFloat(value) || 0 : value
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            let productId = product._id;

            if (isCreating) {
                // Create new product
                const response = await api.post('/products', formData);
                productId = response.data._id; // Assume backend returns the created object with _id
            } else {
                // Update existing product
                await api.put(`/products/${product._id}`, formData);
            }

            // Upload image if selected
            if (selectedFile) {
                const uploadData = new FormData();
                uploadData.append('file', selectedFile);
                // Use the correct ID (newly created or existing)
                await api.post(`/products/${productId}/upload`, uploadData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
            }

            onSave();
            onClose();
        } catch (err: any) {
            console.error("Failed to save product", err);
            setError(err.response?.data?.message || 'Errore durante il salvataggio del prodotto.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm('Sei sicuro di voler eliminare questo prodotto? Questa azione non può essere annullata.')) return;

        setIsLoading(true);
        try {
            await api.delete(`/products/${product._id}`);
            onSave();
            onClose();
        } catch (err: any) {
            console.error("Failed to delete product", err);
            setError(err.response?.data?.message || 'Errore durante l\'eliminazione del prodotto.');
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={onClose} />

            <div className="relative bg-white dark:bg-gray-900 rounded-xl shadow-2xl max-w-2xl w-full flex flex-col max-h-[90vh] overflow-hidden">

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        {isCreating ? 'Nuovo Prodotto' : 'Modifica Prodotto'}
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                        <X className="h-6 w-6" />
                    </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto p-6">
                    {error && (
                        <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    <form id="product-form" onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nome Prodotto</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-sanital-light outline-none transition-all"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Categoria</label>
                                <input
                                    type="text"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-sanital-light outline-none transition-all"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Prezzo (€)</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    step="0.01"
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-sanital-light outline-none transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Descrizione</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={4}
                                required
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-sanital-light outline-none transition-all"
                            />
                        </div>

                        <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                <ImageIcon className="h-4 w-4" /> Immagini (URL)
                            </h3>

                            <div className="space-y-3">
                                <div className="space-y-1">
                                    <label className="block text-xs text-gray-500 dark:text-gray-400">Immagine Principale (URL o Upload)</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            name="img"
                                            value={formData.img}
                                            onChange={handleChange}
                                            placeholder="URL immagine o lascia vuoto per upload"
                                            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-xs text-gray-600 dark:text-gray-300 focus:ring-2 focus:ring-sanital-light outline-none"
                                        />
                                        <div className="relative">
                                            <input
                                                type="file"
                                                id="file-upload"
                                                accept=".png,.jpeg,.jpg"
                                                onChange={handleFileChange}
                                                className="hidden"
                                            />
                                            <label
                                                htmlFor="file-upload"
                                                className="flex items-center justify-center h-full px-3 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                                title="Carica immagine"
                                            >
                                                <Upload className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                                            </label>
                                        </div>
                                    </div>
                                    {previewUrl && (
                                        <div className="mt-2 relative h-20 w-20 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                                            <Image src={previewUrl} alt="Preview" fill className="object-cover" />
                                        </div>
                                    )}
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="block text-xs text-gray-500 dark:text-gray-400">Immagine 1</label>
                                        <input
                                            type="text"
                                            name="img1"
                                            value={formData.img1 || ''}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-xs text-gray-600 dark:text-gray-300 focus:ring-2 focus:ring-sanital-light outline-none"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="block text-xs text-gray-500 dark:text-gray-400">Immagine 2</label>
                                        <input
                                            type="text"
                                            name="img2"
                                            value={formData.img2 || ''}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-xs text-gray-600 dark:text-gray-300 focus:ring-2 focus:ring-sanital-light outline-none"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="block text-xs text-gray-500 dark:text-gray-400">Immagine 3</label>
                                        <input
                                            type="text"
                                            name="img3"
                                            value={formData.img3 || ''}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-xs text-gray-600 dark:text-gray-300 focus:ring-2 focus:ring-sanital-light outline-none"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="block text-xs text-gray-500 dark:text-gray-400">Immagine Secondaria 4</label>
                                        <input
                                            type="text"
                                            name="img4"
                                            value={formData.img4 || ''}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-xs text-gray-600 dark:text-gray-300 focus:ring-2 focus:ring-sanital-light outline-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 flex items-center justify-between">
                    <button
                        type="button"
                        onClick={handleDelete}
                        className={`flex items-center gap-2 px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors text-sm font-medium ${isCreating ? 'invisible' : ''}`}
                        disabled={isLoading || isCreating}
                    >
                        <Trash2 className="h-4 w-4" />
                        Elimina
                    </button>

                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors text-sm font-medium"
                            disabled={isLoading}
                        >
                            Annulla
                        </button>
                        <button
                            type="submit"
                            form="product-form"
                            className="flex items-center gap-2 px-6 py-2 bg-sanital-light hover:bg-sanital-dark text-white rounded-lg transition-colors shadow-sm text-sm font-medium disabled:opacity-50"
                            disabled={isLoading}
                        >
                            <Save className="h-4 w-4" />
                            {isLoading ? 'Salvataggio...' : 'Salva Modifiche'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
