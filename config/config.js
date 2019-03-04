import { routes } from './routes';
import { plugins } from './plugins';
import { webpackConfig } from './webpack';

export default {
  treeShaking: true,
  base: '/inspector/',
  /**
   * build时用于非根目录
   */
  publicPath: process.env.NODE_ENV === 'development' ? '/' : '/inspector/',
  outputPath: '../sd_node/inspector',
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
}
