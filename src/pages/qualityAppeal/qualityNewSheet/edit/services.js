import request from '@/utils/request';

// 质检编辑
export async function updateQuality(params) {
  return request('/quality/updateQuality', { method: 'post', data: params });
}
