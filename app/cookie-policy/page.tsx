import React from 'react';

export default function CookiePolicy() {
    return (
        <div className="bg-white dark:bg-black min-h-screen py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto prose dark:prose-invert">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl mb-8">
                    Cookie Policy
                </h1>

                <p className="lead text-gray-600 dark:text-gray-300 mb-6">
                    Ultimo aggiornamento: {new Date().toLocaleDateString('it-IT')}
                </p>

                <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">1. Cosa sono i Cookie?</h2>
                <p className="text-gray-600 dark:text-gray-300">
                    I cookie sono piccoli file di testo che i siti web salvano sul tuo computer o dispositivo mobile mentre li visiti.
                    I cookie sono ampiamente utilizzati per far funzionare i siti web, o per farli funzionare in modo più efficiente,
                    oltre che per fornire informazioni ai proprietari del sito.
                </p>

                <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">2. Come utilizziamo i Cookie?</h2>
                <p className="text-gray-600 dark:text-gray-300">
                    Utilizziamo i cookie per:
                </p>
                <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300 space-y-2 mt-2">
                    <li>**Cookie Tecnici**: Essenziali per il funzionamento del sito (es. mantenere il carrello attivo, ricordare se hai effettuato l'accesso).</li>
                    <li>**Cookie Analitici**: Per capire come i visitatori interagiscono con il sito (in forma anonima).</li>
                </ul>

                <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">3. Gestione dei Cookie</h2>
                <p className="text-gray-600 dark:text-gray-300">
                    La maggior parte dei browser accetta automaticamente i cookie, ma puoi modificare le impostazioni del browser per rifiutare i cookie
                    se preferisci. Tuttavia, questo potrebbe impedirti di trarre pieno vantaggio dal sito web.
                </p>
                <p className="text-gray-600 dark:text-gray-300 mt-4">
                    Puoi trovare informazioni su come disabilitare i cookie nelle impostazioni del tuo browser specifico (Chrome, Firefox, Safari, Edge ecc.).
                </p>
            </div>
        </div>
    );
}
