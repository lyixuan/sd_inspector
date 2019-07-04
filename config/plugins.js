function date(){
  let nowDate = new Date();
  let year = nowDate.getFullYear();
  let month = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1): nowDate.getMonth() + 1;
  let day = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate();
  let hours = nowDate.getHours() < 10 ? "0" + nowDate.getHours() : nowDate.getHours();
  let minutes = nowDate.getMinutes() < 10 ? "0" + nowDate.getMinutes() : nowDate.getMinutes();
  let seconds = nowDate.getSeconds() < 10 ? "0" + nowDate.getSeconds() : nowDate.getSeconds();
  let dateStr = year + '' + month  + day +'_'+ hours +':'+ minutes +':'+ seconds;
  return dateStr;
}

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
    { name: date() },
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
