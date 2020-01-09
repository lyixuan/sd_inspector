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
    'primary-color': '#FFE300',
    'link-color': '#0062FF',
    'warning-color': '#FF4A53',
    'heading-color': '#1A1C1F',
    'text-color': '#56595E',// #56595E
    'font-size-base': '13px',
    'border-radius-base': '6px', // 组件浮层圆角
    'border-color-base': '#E8EBED',
    'btn-primary-color': '#282828',
    'btn-height-lg': '32px',
    'btn-height-base': '28px',
    'btn-height-sm': '24px',
    'btn-font-size-lg': '14px',
    'tabs-ink-bar-color': '#282828', // 选中线颜色
    'tabs-hover-color': '#999999',
    'tabs-highlight-color': '#282828', // 选中颜色
    '@tooltip-bg': 'rgba(255, 255, 255, 1)', // tooltip
    '@tooltip-color': '#414D55' // tooltip
  },
}
