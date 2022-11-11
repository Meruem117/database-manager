module.exports = {
  transpileDependencies: true,
  pages: {
    index: {
      entry: 'src/main.ts',
      template: 'public/index.html',
      filename: 'index.html',
      title: 'Database Manager',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
  },
  devServer: {
    port: '3000',
    open: false,
    proxy: {
      '/api': {
        target: 'http://localhost:9000',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}