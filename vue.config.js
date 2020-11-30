module.exports = {                              //fejelsztés alatt proxy-n keresztül hívta meg a backendet
    devServer: {
        host: '0.0.0.0',
        port: 4000,
        https: false,
        hotOnly: false,
        proxy: {
            '^/api': {
                target: 'http://localhost:9000',
                ws: true,
                changeOrigin: true,
                secure: false
            }
        }
    }
}