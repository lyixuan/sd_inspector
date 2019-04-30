import request from '@/utils/request';

// 获取柱状图数据
export async function queryHistogramData(params) {
  return request('/general/queryHistogramData', {
    method: 'post',
    data: params,
  });
}
// 获取地图数据相关接口

export async function getMapInfo() {
  return request('/general/getMapInfo');
}

export async function getNodeMsgCount(params) {
  console.log(111, params);
  return request('/general/getNodeMsgCount', {
    params,
    method: 'get',
  });
}
