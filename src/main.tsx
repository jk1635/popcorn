import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import App from './App';

const queryClient = new QueryClient({
    queryCache: new QueryCache({
        onError: error => {
            console.error(`문제가 발생했습니다. ${error.message}`);
        },
    }),
});

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <App />
            <ReactQueryDevtools />
        </QueryClientProvider>
    </StrictMode>
);
