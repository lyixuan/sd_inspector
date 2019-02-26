export default {
  treeShaking: true,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: { webpackChunkName: true },
      title: 'sd_inspector_admin',
      dll: true,
      routes: {
        exclude: [

          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,

          /components\//,
        ],
      },
    }],
  ],
  /**
   * 路由相关配置
   */
  routes: [
    {
      path: '/inspector',
      component: '../layouts/BasicLayout',
      Routes: ['/src/routes/PrivateRoute.js'],
      routes: [
        {
          path: '/inspector',
          redirect: '/inspector/survey',
        },
        {
          path: '/inspector/survey',
          component: './survey',
          Routes: ['/src/routes/PrivateRoute.js'],
        },
        {
          path: '/inspector/details',
          component: './details',
        },
      ],
    },
  ],
}
