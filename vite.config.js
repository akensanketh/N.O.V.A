export default {
  server: {
    host: true,
    port: 2008,
    cors: true,
    proxy: {
      '/api/nvidia': {
        target: 'https://integrate.api.nvidia.com/v1',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/nvidia/, '')
      },
      '/api/sheets': {
        target: 'https://script.google.com',
        changeOrigin: true,
        secure: false,
        followRedirects: true,
        rewrite: (path) => path.replace(/^\/api\/sheets/, '')
      }
    }
  }
};
