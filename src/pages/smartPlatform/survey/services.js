import request from '@/utils/request';

// 获取柱状图数据
export async function queryHistogramData(params) {
  return request('/general/queryHistogramData', {
    method: 'post',
    data: params,
    prefix: '/tmpApi',
  });
}
// 获取地图数据相关接口

export async function getMapInfo() {
  return request('/general/getMapInfo', { prefix: '/tmpApi' });
}
