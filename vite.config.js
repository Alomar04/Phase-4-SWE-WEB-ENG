import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { transform } from 'esbuild'

// Transforms JSX syntax in .js files since @vitejs/plugin-react
// only handles .jsx/.tsx by default
function jsxInJs() {
  return {
    name: 'vite-plugin-jsx-in-js',
    enforce: 'pre',
    async transform(code, id) {
      if (!id.endsWith('.js') || id.includes('node_modules')) return null
      if (!/[<]/.test(code)) return null
      const result = await transform(code, {
        loader: 'jsx',
        jsx: 'automatic',
        jsxImportSource: 'react',
      })
      return { code: result.code, map: result.map || null }
    },
  }
}

export default defineConfig({
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    jsxInJs(),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .jsx, or .js files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
