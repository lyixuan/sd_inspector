import request from '@/utils/request';

// 在途申诉列表
export async function queryOnAppealList(params) {
  const data = {...params,...{type:1}};// type:1 在途
  return request('/creditAppeal/queryAppealDataPage', { method: 'post', data });
}

// 发起二次申诉
export async function startAppeal(params) {
  const data = {...params};
  return request('/creditAppeal/startAppeal', { method: 'post', data });
}

// 对接人审核
export async function sopCheck(data) {
  return request('/creditAppeal/sopCheck', { method: 'post', data });
}

// 主管审核
export async function masterCheck(data) {
  return request('/creditAppeal/masterCheck', { method: 'post', data });
}

// 撤销审核
export async function cancelAppeal(params) {
  return request('/creditAppeal/cancelAppeal', { params });
}

// 主管标签列表
export async function getMasterTagList(params) {
  return request('/creditAppeal/getMasterTagList', {params});
}

