import request from '@/utils/request';

// 申诉审核
export async function sopCheckAppeal(params) {
  return request('/appeal/sopCheckAppeal', { method: 'post', data: params });
}
