import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import nextEnv from '@next/env';

// Next still doesnt supply an esm build for @next/env so conditionally check for it
if (nextEnv && 'loadEnvConfig' in nextEnv) {
    nextEnv.loadEnvConfig(process.cwd());
} else {
    // eslint-disable-next-line
    require('@next/env').loadEnvConfig(process.cwd());
}

export default defineConfig({
    plugins: [react()],
    test: {
        environment: 'jsdom',
    },
});
