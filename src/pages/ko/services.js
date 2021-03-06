import request from '@/utils/request';

// 页面枚举接口
export async function getKOEnumList(params) {
  return request('/homePage/enumList', { method: 'get', params });
}
// 获取配置时间接口
export async function getKoDateRange(params) {
  return request('/apis/time/getKoDateRange', { params });
}
// 获取配置文案接口
export async function getKOMessage(params) {
  return request('/apis/certificationItem/getKOMessage', { params });
}
// 页面下拉二级列表
export async function getPageDetailInfoList(params) {
  return request('/homePage/pageDetailInfoList', { params });
}

// bar 数据
export async function getBarData(params) {
  return request('/homePage/userList', { params });
}

// 用户组全部数据列表
export async function getUserGroupList(params) {
  return request('/userGroup/listAll', { method: 'get', params });
}

// 获取服务器当前时间
export async function getCurrentTime(params) {
  return request('/common/getCurrentTime', { method: 'get', params });
}
