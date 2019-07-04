import moment from 'moment';
export const plugins = [['umi-plugin-react', {
  antd: true,
  dva: true,
  dynamicImport: {
    webpackChunkName: true,
    loadingComponent: '../src/components/PageLoading/index.js'
  },
  title: 'sd_inspector_admin',
  chunks: ['vendors', 'umi'],
  dll: true,
  metas: [
    { updateTime: moment(new Date()).format('YYYY-MM-DD HH:mm:ss') },
  ],
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
