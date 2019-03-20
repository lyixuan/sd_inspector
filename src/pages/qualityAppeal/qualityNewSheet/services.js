import request from '@/utils/request';

// 查询质检列表
export async function getQualityList(params) {
  return request('/quality/queryQualityDataPage', {method: 'post',data: params});
}

