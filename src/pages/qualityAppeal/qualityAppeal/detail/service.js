import request from '@/utils/request';

// 申诉详情页面
export async function getAppealDetail(params) {
  return request('/appeal/getAppealInfo', { params });
}
// 质检详情页面
export async function getQualityDetail(params) {
  return request('/quality/getQualityInfo', { params });
}
