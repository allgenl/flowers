import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  base: '/flowers/', // Если сайт будет example.com/myapp/
  plugins: [react()],
});
