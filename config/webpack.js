// 处理umi对应的webpack配置
// 根据API_ENV环境不同分为debugger开发代理(api),development为使用dev的api,production为使用线上api
const proxyHost = {
    localhost: 'http://127.0.0.1:8096',
    development: 'http://172.16.117.65:8096', //65测试
    // development: 'http://172.16.117.64:8098', //64测试
    // development: 'http://172.16.117.65:8085', //64测试
    // development: 'http://172.16.59.142:8098', //本地测试
    production: 'http://api.bd.ministudy.com',
};
const proxy_env = proxyHost[process.env.PROXY_ENV];
export const webpackConfig = {

    externals: {
        // echarts: 'echarts',
        // d3: 'd3',
    },
    define: {
        'process.env.LOGIN_TYPE': process.env.LOGIN_TYPE,
        'process.env.PROXY_ENV': process.env.PROXY_ENV,
    },
    // chainWebpack(config, { webpack }) {
    //     config.merge({
    //         optimization: {
    //             minimize: true,
    //             splitChunks: {
    //                 chunks: 'all',
    //                 minSize: 0,
    //                 minChunks: 3,
    //                 maxAsyncRequests: 5,
    //                 maxInitialRequests: 3,
    //                 automaticNameDelimiter: '.',
    //                 cacheGroups: {
    //                     vendor: {
    //                         name: 'vendors',
    //                         test({ resource }) {
    //                             return /[\\/]node_modules[\\/]/.test(resource);
    //                         },
    //                         priority: 10,
    //                     },
    //                 },
    //             },
    //         }
    //     });

    // },
    define: {
        'process.env.LOGIN_TYPE': process.env.LOGIN_TYPE,
        'process.env.PROXY_ENV': process.env.PROXY_ENV,
    },
    alias: {
        '@': require('path').resolve(__dirname, 'src'),
    },
    proxy: {
        '/proxy': {

            target: proxy_env, //  区别于self接口
            target: 'http://172.16.59.42:8085', //  张晔接口地址
            changeOrigin: true,
            pathRewrite: { '/proxy': '/' }
        },
        '/oldApi': {
            target: proxy_env, //  区别于self接口
            changeOrigin: true,
        },
        '/tmpApi': {
            target: proxy_env, //  区别于self接口
            changeOrigin: true,
        },
    },
};
