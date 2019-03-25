import request from '@/utils/request';

// 申诉 - 查看申诉详情接口
export async function getAppealInfo(params) {
  return request('/appeal/getAppealInfo', { params });
}
// 申诉 - 主管复审申诉接口
export async function reviewAppel(params) {
  return request('/appeal/masterCheckAppeal', { method: 'post', data: params });
}
