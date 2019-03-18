import request from '@/utils/request';

// 省份接口
export async function province(params) {
  return request('/exam/province', { method: 'post', data: params });
}
// 获取地图数据相关接口

export async function examTotal() {
  return request('/exam/total');
}
