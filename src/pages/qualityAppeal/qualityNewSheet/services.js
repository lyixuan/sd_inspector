import request from '@/utils/request';

// 查询质检列表
export async function getQualityList(params) {
  return request('/quality/queryQualityDataPage', { method: 'post', data: params });
}
////根据邮箱获取组织信息
export async function getOrgMapByMail(params) {
  return request('/orgMap/getOrgMapByMail', { params });
}

