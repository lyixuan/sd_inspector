import request from '@/utils/request';

// 页面枚举接口
export async function getKOEnumList(params) {
  return request('http://172.16.109.173:8085/homePage/enumList', { method: 'get', params, prefix: null });
}
// 获取配置时间接口
export async function getKoDateRange(params) {
  return request('/time/getKoDateRange', { params, prefix: '/oldApi' });
}
// 获取配置文案接口
export async function getKOMessage(params) {
  return request('/certificationItem/getKOMessage', { params, prefix: '/oldApi' });
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
  return request('http://172.16.109.173:8085/userGroup/listAll', { method: 'get', params, prefix: null });
}

