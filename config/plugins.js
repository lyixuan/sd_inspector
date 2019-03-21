export const plugins = [['umi-plugin-react', {
  antd: true,
  dva: true,
  dynamicImport: {
    webpackChunkName: true,
    loadingComponent: '../src/components/PageLoading/index.js'
  },
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
}]];
