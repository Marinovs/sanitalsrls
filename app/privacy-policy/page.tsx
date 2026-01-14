import React from 'react';

export default function PrivacyPolicy() {
    return (
        <div className="bg-white dark:bg-black min-h-screen py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto prose dark:prose-invert">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl mb-8">
                    Privacy Policy
                </h1>

                <p className="lead text-gray-600 dark:text-gray-300 mb-6">
                    Ultimo aggiornamento: {new Date().toLocaleDateString('it-IT')}
                </p>

                <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">1. Introduzione</h2>
                <p className="text-gray-600 dark:text-gray-300">
                    Benvenuti su Sanital Srls. Ci impegniamo a proteggere la vostra privacy e i vostri dati personali.
                    Questa Privacy Policy spiega come raccogliamo, utilizziamo e proteggiamo le vostre informazioni.
                </p>

                <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">2. Titolare del Trattamento</h2>
                <p className="text-gray-600 dark:text-gray-300">
                    Sanital Srls<br />
                    Via Quercete 43, 81016 San Potito Sannitico (CE)<br />
                    Email: sanitalsrls@gmail.com
                </p>

                <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">3. Dati Raccogliamo</h2>
                <p className="text-gray-600 dark:text-gray-300">
                    Possiamo raccogliere le seguenti categorie di dati personali:
                </p>
                <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300 space-y-2 mt-2">
                    <li>Dati di contatto (nome, email, numero di telefono) forniti compilando i form sul sito.</li>
                    <li>Dati tecnici (indirizzo IP, tipo di browser) raccolti automaticamente durante la navigazione.</li>
                </ul>

                <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">4. Finalità del Trattamento</h2>
                <p className="text-gray-600 dark:text-gray-300">
                    Utilizziamo i vostri dati per:
                </p>
                <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300 space-y-2 mt-2">
                    <li>Rispondere alle vostre richieste di contatto.</li>
                    <li>Gestire eventuali ordini o richieste di preventivo.</li>
                    <li>Migliorare la qualità del nostro sito web.</li>
                </ul>

                <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">5. Condivisione dei Dati</h2>
                <p className="text-gray-600 dark:text-gray-300">
                    Non vendiamo né cediamo i vostri dati personali a terzi per scopi di marketing.
                    Possiamo condividere i dati con fornitori di servizi terzi che ci aiutano a gestire il sito (es. hosting),
                    vincolati da obblighi di riservatezza.
                </p>

                <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">6. I Vostri Diritti</h2>
                <p className="text-gray-600 dark:text-gray-300">
                    Avete il diritto di accedere, rettificare, cancellare o limitare il trattamento dei vostri dati personali.
                    Per esercitare tali diritti, contattateci all'indirizzo email sopra indicato.
                </p>
            </div>
        </div>
    );
}
