import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import monacoEditorPlugin from 'vite-plugin-monaco-editor';

export default defineConfig({
  plugins: [react(), monacoEditorPlugin.default(
    {
      languageWorkers: ['html', 'css', 'typescript'],  // You can add more languages if needed
    }
  )],
})
