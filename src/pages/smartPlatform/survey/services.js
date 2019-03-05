import request from '@/utils/request';

// 获取柱状图数据
export async function queryHistogramData(params) {
  return request('/general/queryHistogramData', { method:'post', data:params});
}
