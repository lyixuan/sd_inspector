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
    name: '质检归属人',
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
  '/qualityAppeal/qualityAppeal/detail': {
    name: '删除质检单',
  },
  // ------------ 学分申诉
  '/scoreAppeal/awaitAppeal/specialNewer':{
    name: '待申诉',      // -优新
  },
  '/scoreAppeal/awaitAppeal/IM':{
    name: '待申诉',      // -IM
  },
  '/scoreAppeal/awaitAppeal/order':{
    name: '待申诉',      // -工单
  },
  '/scoreAppeal/awaitAppeal/baseline':{
    name: '待申诉',      // -底线
  },
  '/scoreAppeal/awaitAppeal/createIncome':{
    name: '待申诉',      // -创收
  },
  // --
  '/scoreAppeal/onAppeal/specialNewer':{
    name: '在途申诉',      // -优新
  },
  '/scoreAppeal/onAppeal/IM':{
    name: '在途申诉',      // -IM
  },
  '/scoreAppeal/onAppeal/order':{
    name: '在途申诉',      // -工单
  },
  '/scoreAppeal/onAppeal/baseline':{
    name: '在途申诉',      // -底线
  },
  '/scoreAppeal/onAppeal/createIncome':{
    name: '在途申诉',      // -创收
  },
  // --
  '/scoreAppeal/finishAppeal/specialNewer':{
    name: '结案申诉',      // -优新
  },
  '/scoreAppeal/finishAppeal/IM':{
    name: '结案申诉',      // -IM
  },
  '/scoreAppeal/finishAppeal/order':{
    name: '结案申诉',      // -工单
  },
  '/scoreAppeal/finishAppeal/baseline':{
    name: '结案申诉',      // -底线
  },
  '/scoreAppeal/finishAppeal/createIncome':{
    name: '结案申诉',      // -创收
  },
  // --
  '/scoreAppeal/roles/master': {
  name: '在途申诉-主管',
  },
  '/scoreAppeal/roles/dockingMan': {
    name: '在途申诉-对接人',
  },
  '/scoreAppeal/roles/master2': {
    name: '结案申诉-主管',
  },
  '/scoreAppeal/roles/dockingMan2': {
    name: '结案申诉-对接人',
  },
  // --
  '/scoreAppeal/awaitAppeal/detail':{
    name: '详情',      // -待申诉
  },
  '/scoreAppeal/onAppeal/detail':{
    name: '详情',      // -在途
  },
  '/scoreAppeal/finishAppeal/detail':{
    name: '详情',      // -结案
  },
  '/scoreAppeal/awaitAppeal/appeal':{
    name: '发起申诉',      // -待申诉
  },
  '/scoreAppeal/onAppeal/appeal':{
    name: '发起申诉',      // -在途
  },
  '/scoreAppeal/onAppeal/repeal':{
    name: '撤销',      // -在途
  },
  '/scoreAppeal/appeal/dockingMan':{
    name: '对接人审核',      // -在途
  },
  '/scoreAppeal/appeal/master':{
    name: '主管审核',      // -在途
  },
  '/scoreAppeal/onAppeal/export':{
    name: '导出',      // -在途
  },
  '/scoreAppeal/finishAppeal/export':{
    name: '导出',      // -结案
  },
};
export { urlPathMap };
