/** ***
 * name:菜单栏显示名字,pathname:对应url路径
 * 用于维护非route的权限，仅用于查看都维护了那些非route权限，这些权限会添加在在系统的用户权限里。
 * 建议path路径结构与route相同
 */
const urlPathMap = {
  '/qualityAppeal/qualityNewSheet/exportRt': {
    name: '导出查询结果',
  },
  '/qualityAppeal/qualityNewSheet/delete': {
    name: '删除质检',
  },
  '/qualityAppeal/qualityNewSheet/repeal': {
    name: '质检单撤销',
  },
  '/qualityAppeal/qualityAppeal/repeal': {
    name: '申诉撤销',
  },
  '/qualityAppeal/qualityAppeal/export': {
    name: '导出在途申诉',
  },
  '/qualityAppeal/qualityNewSheet/showQR': {
    name: '显示质检发起人',
  },
  '/qualityAppeal/qualityAppeal/showQA': {
    name: '显示质检归属人',
  },
  '/qualityAppeal/qualityNexSheet/edit': {
    name: '质检专员-编辑质检单',
  },
  '/qualityAppeal/qualityNexSheet/superioEdit': {
    name: '质检主管-编辑质检单',
  },
  '/qualityAppeal/qualityNexSheet/appealReCheck': {
    name: '质检主管申诉复审',
  },
  '/qualityAppeal/qualityAppeal/launch': {
    name: '发起申诉',
  },
  '/qualityAppeal/qualityNexSheet/appealCheck': {
    name: '申诉审核',
  },
  '/qualityAppeal/qualityNexSheet/qualityDetail': {
    name: '质检详情',
  },
  '/qualityAppeal/qualityNexSheet/appealDetail': {
    name: '申诉详情',
  },


};
export { urlPathMap };
