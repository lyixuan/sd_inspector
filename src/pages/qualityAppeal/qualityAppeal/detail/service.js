import request from '@/utils/request';

// 申诉详情页面
export async function getAppealDetail(params) {
  return request('/appeal/getAppealInfo', { params });
}

