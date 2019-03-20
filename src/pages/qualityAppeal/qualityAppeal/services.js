import request from '@/utils/request';

// 查询申诉列表
export async function getAppealList(params) {
  return request('/quality/appeal/queryAppealDataPage', {method: 'post',data: params});
}

