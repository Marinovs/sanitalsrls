'use client';

import React, { useCallback } from 'react';
import api from '../services/api';
import { useProducts } from '../context/ProductContext';
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';

import { useAuth } from '../context/AuthContext';

export default function CsvUploader() {
    const { loadProductsFromCsv, products } = useProducts();
    const { user } = useAuth();
    const [status, setStatus] = React.useState<'idle' | 'parsing' | 'success' | 'error'>('idle');
    const [message, setMessage] = React.useState('');

    // Access Control: Only admins can see this component
    if (!user || user.role !== 'admin') {
        return null;
    }

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setStatus('parsing'); // Reusing 'parsing' state for 'uploading'
        setMessage('Caricamento in corso...');

        const formData = new FormData();
        formData.append('file', file);

        try {
            // Let Axios set the Content-Type with the boundary automatically
            await api.post('/products/upload-csv', formData);

            setStatus('success');
            setMessage('Caricamento completato con successo!');
            // Trigger refresh in context
            loadProductsFromCsv([]);
        } catch (error: any) {
            console.error("Upload error full object:", error);
            if (error.response) {
                console.error("Server Error Data:", error.response.data);
            }
            setStatus('error');
            const serverMsg = error.response?.data?.message;
            setMessage(serverMsg ?
                (Array.isArray(serverMsg) ? serverMsg.join(', ') : serverMsg)
                : 'Errore durante il caricamento file (400 Bad Request).');
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 max-w-xl mx-auto">
            <div className="text-center mb-6">
                <div className="bg-blue-50 dark:bg-blue-900/30 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Upload className="h-6 w-6 text-sanital-light" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Importa Prodotti da CSV</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Carica il tuo catalogo prodotti per aggiornare il sito.</p>
            </div>

            <div className="flex flex-col items-center justify-center w-full">
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <FileText className="w-8 h-8 text-gray-400 mb-2" />
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Clicca per caricare</span> o trascina il file qui</p>
                        <p className="text-xs text-gray-500 dark:text-gray-500">CSV (Max 5MB)</p>
                    </div>
                    <input id="dropzone-file" type="file" accept=".csv" className="hidden" onChange={handleFileUpload} />
                </label>
            </div>

            {status !== 'idle' && (
                <div className={`mt-6 p-4 rounded-md flex items-start ${status === 'success' ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300' :
                    status === 'error' ? 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300' : 'bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300'
                    }`}>
                    {status === 'success' && <CheckCircle className="h-5 w-5 mr-3 shrink-0" />}
                    {status === 'error' && <AlertCircle className="h-5 w-5 mr-3 shrink-0" />}
                    {status === 'parsing' && <Upload className="h-5 w-5 mr-3 shrink-0 animate-bounce" />}

                    <div className="text-sm font-medium">{message}</div>
                </div>
            )}

            <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
                <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Prodotti attuali in memoria</h4>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{products.length}</div>
            </div>

            <div className="mt-4 bg-gray-50 dark:bg-gray-900 p-3 rounded text-xs font-mono text-gray-500 dark:text-gray-400 overflow-x-auto">
                Header richiesti: id, name, description, price, category, image_main, image_sub1, image_sub2
            </div>
        </div>
    );
}
