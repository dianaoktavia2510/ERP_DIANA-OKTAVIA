import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, '.', '');

  return {
    plugins: [react()],
    define: {
      // Expose all environment variables to the client side.
      // This allows you to use process.env.API_KEY, process.env.FIREBASE_API_KEY, etc.
      // WARNING: Do not put secret backend keys (like service account keys) in your Vercel env vars for this project.
      'process.env': JSON.stringify(env),
    },
    build: {
      outDir: 'dist',
    },
    server: {
      port: 3000,
    }
  };
});