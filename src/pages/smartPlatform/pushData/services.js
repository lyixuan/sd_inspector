import request from '@/utils/request';

export async function getData(params) {
  return request('/node/getQueryPushNumByPage', {
    method: 'post',
    data: params,
    prefix: '/tmpApi',
  });
}
export async function exportData(params) {
  return request('/node/export', {
    method: 'post',
    data: params,
    responseType: 'blob',
    getResponse: true,
    prefix: '/tmpApi',
  });
}
