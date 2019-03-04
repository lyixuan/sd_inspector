// 处理umi对应的webpack配置
// 根据API_ENV环境不同分为debugger开发代理(api),development为使用dev的api,production为使用线上api
const proxyHost = {
    localhost: 'http://127.0.0.1:8095/',
    development: '',   // 待确定
    production: ''     // 待确定
}
const proxy_env = proxyHost[process.env.PROXY_ENV];
export const webpackConfig = {
    define: {
        PROXY: '/proxy',    // 代理用pathname,跟下面proxy应保持一致,用于proxy设置,也可用于紧急设置直连java接口host
        'process.env.LOGIN_TYPE': process.env.LOGIN_TYPE,
    },
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