import request from '@/utils/request';
// 配置信息
// 家族-学院列表
export async function getIncomeCollegeList(params) {
  return request('/orgMap/findCollegeShortNameList', { method: 'get', params });
}

