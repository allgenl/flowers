import { jsx as _jsx } from "react/jsx-runtime";
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App'; // Без .js, так как TypeScript сам подставляет нужное расширение
const rootElement = document.getElementById('root');
if (!rootElement) {
    throw new Error('Root element not found');
}
createRoot(rootElement).render(_jsx(StrictMode, { children: _jsx(App, {}) }));
