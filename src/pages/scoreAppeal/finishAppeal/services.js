import request from '@/utils/request';

// 结案申诉列表
export async function queryFinishAppealList(params) {
  const data = {...params,...{type:2}};
  return request('/creditAppeal/queryAppealDataPage', { method: 'post', data });
}

