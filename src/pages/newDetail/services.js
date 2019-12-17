import request from '@/utils/request';
export async function getUserInfo(params) {
  return request('/deskperfpcapi/user/info', { method: 'get', params });
}

// 获取当前绩效周期
export async function getCurrentDateRange(params) {
  return request('/deskperfpcapi/incomeKpiCommon/getCurrentDateRange', { method: 'get', params });
}

// 获取热销榜单列表
export async function getHotList() {
  return request('/orgMap/findCollegeShortNameList', { method: 'get' });
}

// 飙升产品包榜单
export async function risePackageRankList() {
  return request('/classWorkbench/risePackageRankList', { method: 'get' });
}
// 热销产品包列表
export async function packageRankList(data) {
  return request('/adminWorkbench/hotSellPackage/packageRankList', { method: 'POST', data: data });
}
