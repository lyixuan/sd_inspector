import request from '@/utils/request';

// 页面枚举接口
export async function getMessage(params) {
  return request('/common/getSiteUrl', { method: 'get', params });
}
