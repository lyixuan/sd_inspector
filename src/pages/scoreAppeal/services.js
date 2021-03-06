import request from '@/utils/request';

// 查询组织架构
export async function getOrgMapList(params) {
  return request('/orgMap/getOrgMapList', { params });
}
// 查询质检申诉管理归属组织架构
export async function getOrgMapTree(params) {
  return request('/orgMap/getOrgMapTree');
}

// 查询学分维度
export async function creditDimensionList(params) {
  return request('/creditAppeal/creditDimensionList', { params });
}

// 获取申诉基础详情
export async function getBaseAppealInfo(params) {
  return request('/creditAppeal/getBaseAppealInfo', { params });
}

// 获取审核记录详情
export async function getAppealInfoCheckList(params) {
  return request('/creditAppeal/getAppealInfoCheckList', { params });
}

// 导出
export async function exportExcel(data) {
  return request('/creditAppeal/exportExcel', {
    method: 'post',
    data,
    responseType: 'blob',
    getResponse: true,
  });
}

// 获取可选择的日期范围
export function getTimeRange() {
  return request('/apis/time/getRange');
}
