import request from '@/utils/request';

// 获取考期列表
export async function getExamList(params) {
  return request('/exam/examYearMonth', { method: 'get', params });
}
// 获取数据
export async function getProvinceData(params) {
  return request('/exam/examinationTimeOfProvince', { method: 'post', data: params });
}