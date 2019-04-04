import request from '@/utils/request';

// 获取柱状图数据
export async function provinceOrg(params) {
  return request('/exam/province/org', { method: 'post', data: params, prefix: '/tmpApi' });
}
