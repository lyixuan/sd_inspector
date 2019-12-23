import request from '@/utils/request';

// 准考证填写排行
export async function zkzWriteList(params) {
  return request('/test/zkzStatistics/zkzWrite/list', { method: 'post', data: params });
}
// 准考证填写明细
export async function zkzWriteDetail(params) {
  return request('/zkzStatistics/zkzWrite/detail', { method: 'post', data: params });
}

// 错误信息
export async function errorData(params) {
  return request('/zkzStatistics/zkzWrite/errorData', { method: 'post', data: params });
}

// 错误明细
export async function exportErrorDetail(params) {
  return request('/zkzStatistics/zkzWrite/exportErrorDetail', { method: 'post', data: params, responseType: 'blob', getResponse: true });
}

