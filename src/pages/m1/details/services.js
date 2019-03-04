import request from '@/utils/request';

// 数据明细查询结果
export async function getDetailDataPage(params) {
  return request('/general/queryDetailDataPage', { params });
}
