import request from '@/utils/request';

// 在途申诉列表
export async function queryOnAppealList(params) {
  const data = {...params,...{type:1}};
  return request('/creditAppeal/queryAppealDataPage', { method: 'post', data });
}

