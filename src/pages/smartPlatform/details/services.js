import request from '@/utils/request';

// 数据明细查询结果
export async function getDetailDataPage(params) {
  return request('/general/queryDetailDataPage', { params });
}

// 我的查询条件
export async function getQueryConditionList() {
  return request('/detail/getQueryConditionList');
}
