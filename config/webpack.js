// 处理umi对应的webpack配置
// 根据API_ENV环境不同分为debugger开发代理(api),development为使用dev的api,production为使用线上api
const proxyHost = {
  localhost: 'http://test.xd.temp.ministudy.com',
  development: 'http://test.xd.temp.ministudy.com',
  // development: 'http://test.dx.ministudy.com',
  production: 'http://api.bd.ministudy.com',
};

const proxy_env = proxyHost[process.env.PROXY_ENV];

export const webpackConfig = {

  externals: {
    // echarts: 'echarts',
    // d3: 'd3',
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
<<<<<<< HEAD
    'process.env.LOGIN_TYPE': process.env.LOGIN_TYPE,
    'process.env.PROXY_ENV': process.env.PROXY_ENV,
=======
>>>>>>> release
    'process.env.ENV_TYPE': process.env.ENV_TYPE,
  },
  alias: {
    '@': require('path').resolve(__dirname, 'src'),
  },
  // proxy: {
  //   // '/proxy': {
  //   //   // target: 'http://172.16.59.227:8090/', //  本地开发
  //   //   target: 'http://172.16.58.18:8090/', //  本地开发
  //   //   changeOrigin: true,
  //   //   pathRewrite:{'/proxy':'/'}
  //   // },
  //   '/proxy': {
  //     target: proxy_env, //  区别于self接口
  //     changeOrigin: true,
  //   },
  //   '/oldApi': {
  //     target: proxy_env, //  区别于self接口
  //     changeOrigin: true,
  //   },
  //   '/tmpApi': {
  //     target: proxy_env, //  区别于self接口
  //     changeOrigin: true,
  //   },
  // },
};
