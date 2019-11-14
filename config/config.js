import { routes } from './routes';
import { plugins } from './plugins';
import { webpackConfig } from './webpack';


export default {
  treeShaking: true,
  base: '/inspector/',
  /**
   * build时用于非根目录
   */
  publicPath: '/inspector/',
  outputPath: './inspector',    //   ../sd_node/inspector
  // outputPath: '../sd_node/inspector',
  context:{
    ENV_TYPE:process.env.ENV_TYPE
  },
  /**
   * webpack相关配置
   * **/
  ...webpackConfig,
  /**
   * 插件相关配置
   */
  plugins,
  /**
   * 路由相关配置
   */
  routes,
  /*
  * 皮肤相关
  */
  theme: {
    'primary-color': '#00CCC3',
    'link-color': '#00CCC3',
    'warning-color': '#FF4A53',
    'heading-color': '#1A1C1F',
    'text-color': '#56595E',
    'font-size-base': '13px',
    'border-radius-base': '6px', // 组件浮层圆角
    'border-color-base': '#E8EBED',
  },
}
