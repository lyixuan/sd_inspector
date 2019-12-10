import request from '@/utils/request';

// 报考触达列表
export async function reachNumRankList(params) {
  return request('/examNotice/reachNumRankList', { method: 'post', data: params });
}
// 报考触达明细
export async function reachNumDetail(params) {
  return request('/examNotice/reachNumDetail', { method: 'post', data: params });
}
