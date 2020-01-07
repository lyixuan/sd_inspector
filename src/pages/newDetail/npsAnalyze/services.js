import request from '@/utils/request';
// 获取原因分类列表
export async function getReasonTypeTree(params) {
  return request('/workbench/getReasonTypeTree', { method: 'get', params });
}

// nps - 南丁格尔玫瑰图
export async function getCycleList(data) {
  return request('/nps/getCycleList', { method: 'POST', data });
}

// nps - 获取nps星级数据接口
export async function getNpsAutonomousEvaluation(data) {
  return request('/nps/getNpsAutonomousEvaluation', { method: 'POST', data });
}

// nps - NPS标签列表接口
export async function getTagList(params) {
  return request('/nps/getTagList', { method: 'get', params });
}

// 底表下载
export async function exportData(data) {
  return request('/bottomTask/add', { method: 'POST', data, server: 'downloadCenter' });
}