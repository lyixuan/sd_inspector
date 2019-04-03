import request from '@/utils/request';

// 申诉 - 查看申诉详情接口
export async function getAppealInfo(params) {
  return request('/appeal/getAppealInfo', { params });
}
// 申诉 - sop申诉接口
export async function sopAppeal(params) {
  return request('/appeal/sopCheckAppeal', { method: 'post', data: params });
}
// 申诉 - 主管复审申诉接口
export async function reviewAppeal(params) {
  return request('/appeal/masterCheckAppeal', { method: 'post', data: params });
}
// 质检详情
export async function getQualityDetail(params) {
  return request('/quality/getQualityInfo', { params });
}
