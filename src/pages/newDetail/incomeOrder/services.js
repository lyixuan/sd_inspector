import request from '@/utils/request';
// 配置信息
// 家族-学院列表
export async function getIncomeCollegeList(params) {
  return request('/orgMap/findCollegeShortNameList', { method: 'get', params });
}


// 家族创收对比-小组创收对比
export async function getIncomeDetailPage(data) {
  return request('/deskperfpcapi/income/queryDetailPage', { method: 'POST', data });
}