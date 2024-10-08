import path from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), svgr()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@assets': path.resolve(__dirname, './src/assets'),
            '@components': path.resolve(__dirname, './src/components'),
            '@constants': path.resolve(__dirname, './src/constants'),
            '@hooks': path.resolve(__dirname, './src/hooks'),
            '@libs': path.resolve(__dirname, './src/libs'),
            '@pages': path.resolve(__dirname, './src/pages'),
            '@stores': path.resolve(__dirname, './src/stores'),
            '@styles': path.resolve(__dirname, './src/styles'),
            '@/types': path.resolve(__dirname, './src/types'),
            '@utils': path.resolve(__dirname, './src/utils'),
        },
    },
});
