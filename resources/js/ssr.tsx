import ReactDOMServer from 'react-dom/server';
import { createInertiaApp } from '@inertiajs/react';
import createServer from '@inertiajs/react/server';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { route } from '../../vendor/tightenco/ziggy';
import { RouteName } from 'ziggy-js';
import { ThemeProvider } from 'next-themes';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createServer((page) =>
    createInertiaApp({
        page,
        render: ReactDOMServer.renderToString,
        title: (title) => `${title} - ${appName}`,
        resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
        setup: ({ App, props }) => {
            global.route<RouteName> = (name, params, absolute) =>
                route(name, params as any, absolute, {
                    // @ts-ignore-error
                    ...page.props.ziggy,
                    // @ts-ignore-error
                    location: new URL(page.props.ziggy.location),
                });

            return <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange><App {...props} /></ThemeProvider>;
        },
    })
);
