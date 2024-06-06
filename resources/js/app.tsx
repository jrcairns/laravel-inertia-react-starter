import './bootstrap';
import '../css/app.css';

import { createRoot, hydrateRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ThemeProvider } from 'next-themes';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
    setup({ el, App, props }) {
        if (import.meta.env.DEV) {
            createRoot(el).render(<ThemeProvider attribute="class" defaultTheme="system" disableTransitionOnChange><App {...props} /></ThemeProvider>);
            return
        }

        hydrateRoot(el, <ThemeProvider attribute="class" defaultTheme="system" disableTransitionOnChange><App {...props} /></ThemeProvider>);
    },
    progress: {
        color: '#4B5563',
    },
});
