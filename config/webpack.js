// 处理umi对应的webpack配置
// 根据API_ENV环境不同分为debugger开发代理(api),development为使用dev的api,production为使用线上api
const proxyHost = {
    localhost: 'http://127.0.0.1:4000/',
    development: '',   // 待确定
    production: ''     // 待确定
}
const proxy_env = proxyHost[process.env.PROXY_ENV];;
export const webpackConfig = {
    alias: {
        '@': require('path').resolve(__dirname, 'src'),
    },
    proxy: {
        '/proxy': {
            target: proxy_env, //  区别于self接口
            changeOrigin: true,
        }
    },
}