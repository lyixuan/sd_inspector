/** ***
 * name:菜单栏显示名字,pathname:对应url路径
 * 用于维护非route的权限，仅用于查看都维护了那些非route权限，这些权限会添加在在系统的用户权限里。
 * 建议path路径结构与route相同
 */
const urlPathMap = {
  '/qualityAppeal/qualityNewSheet/exportResult': {
    name: '导出查询结果',
  },
  '/qualityAppeal/qualityNewSheet/delete': {
    name: '删除质检',
  },
  '/qualityAppeal/qualityNewSheet/repeal': {
    name: '质检单撤销',
  },
};
export { urlPathMap };
