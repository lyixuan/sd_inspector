import request from '@/utils/request';

// 获取绩效包
export async function getTimeRange(params) {
  return request('/orgMap/getOrgMapList', { params });
}
