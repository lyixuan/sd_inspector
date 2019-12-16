import request from '@/utils/request';
export async function getUserInfo(params) {
  return request('/deskperfpcapi/user/info', { method: 'get', params });
}

// 获取当前绩效周期
export async function getCurrentDateRange(params) {
  return request('/deskperfpcapi/incomeKpiCommon/getCurrentDateRange', { method: 'get', params });
}
