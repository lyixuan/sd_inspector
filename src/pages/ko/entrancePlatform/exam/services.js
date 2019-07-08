import request from '@/utils/request';

// 页面枚举接口
export async function getKOEnumList(params) {
  return request('/homePage/enumList', { method: 'get', params });
}
// 用户组全部数据列表
export async function getUserGroupList(params) {
  return request('/userGroup/listAll', { method: 'get', params });
}
// 督学 - 学员人数查询
export async function queryUserCount(data) {
  return request('/dx/queryUserCount', {  method: 'post', data });
}
// 督学 - 创建用户组
export async function createUserGroup(data) {
  return request('/dx/createUserGroup', { method: 'post', data});
}
// 导出数据
export async function exportData(data) {
  return request('/dx/statExport', { method: 'post', data, responseType:'blob', getResponse: true });
}
// table 列表数据
export async function getTableList(data) {
  return request('/dx/statList', { method: 'post', data });
}
