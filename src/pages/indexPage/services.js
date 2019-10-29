import request from '@/utils/request';
export async function getUserInfo(params) {
  return request('/deskperfpcapi/user/info', { method: 'get', params });
}
// 查询组织架构
export async function getOrgMapList(params) {
  return request('/orgMap/getOrgMapList', { params });
}






