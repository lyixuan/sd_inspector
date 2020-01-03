import request from '@/utils/request';

export async function getUserOrgList(params) {
  return request('/orgMap/getOwnExamMapListThreeLevel', { method: 'get', params });
}
export async function queryPage(params) {
  return request('/ko/im/queryPage', { method: 'post', data: params });
}