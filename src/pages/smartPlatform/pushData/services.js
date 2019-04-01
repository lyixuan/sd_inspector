import request from '@/utils/request';

export async function getData(params) {
  return request('/node/getQueryPushNumByPage', { method: 'post', data: params });
}
export async function exportData(params) {
  return request('/node/export', { method: 'post', data: params });
}
