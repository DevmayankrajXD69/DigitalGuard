import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        'what-is-digital-footprint': 'what-is-digital-footprint.html',
        'how-its-formed': 'how-its-formed.html',
        'consequences': 'consequences.html',
        'data-storage': 'data-storage.html',
        'how-to-manage': 'how-to-manage.html',
        'cleanup-guide': 'cleanup-guide.html',
        'social-media-guide': 'social-media-guide.html',
        'action-steps': 'action-steps.html',
        'tools': 'tools.html',
        'resources': 'resources.html'
      }
    }
  },
  server: {
    open: true
  }
})