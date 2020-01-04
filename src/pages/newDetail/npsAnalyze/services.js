import request from '@/utils/request';
// 获取原因分类列表
export async function getReasonTypeTree(params) {
  return request('/workbench/getReasonTypeTree', { method: 'get', params });
}

//NPS自主评价分析及云图的数据接口
export async function getNpsAutonomousEvaluation(data) {
  return request('/nps/getNpsAutonomousEvaluation', { method: 'POST', data: data });
}