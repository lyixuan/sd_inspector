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
      routes: [
        {
          path: '/inspector/survey',
          component: './survey',
        },
        {
          path: '/inspector/details',
          component: './details',
        },
      ],
    },
  ],
}
