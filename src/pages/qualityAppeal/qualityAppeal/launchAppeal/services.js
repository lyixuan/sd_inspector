import request from '@/utils/request';

// 发起申诉
export async function launchAppeal(params) {
  return request('/appeal/addAppeal', { method: 'post', data: params });
}
