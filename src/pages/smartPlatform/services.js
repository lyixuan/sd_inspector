import request from '@/utils/request';

// 查询组织架构
export async function getOrgInfo(params) {
  return request('/general/getOrgList', { params });
}
// 当前考期时间范围接口
export async function getExamDateRange(params) {
  return request('/general/getExamDateRange', { params });
}
// 获取地图数据相关接口

export async function getMapInfo(params) {
  return request('/general/getMapInfo', { params });
}
