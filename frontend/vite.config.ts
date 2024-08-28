import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    css: {
        modules: {
            generateScopedName: '[name]_[local]__[hash:base64:5]',
            localsConvention: 'camelCaseOnly',
        },
    },
})
