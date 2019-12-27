import request from '@/utils/request';

// 学分对比组织架构列表接口
export async function getUserOrgList(params) {
  return request('/test/orgMap/getOwnExamMapListThreeLevel', { method: 'get', params });
}
export async function queryPage(params) {
  return request('/test/ko/im/queryPage', { method: 'post', data: params });
}