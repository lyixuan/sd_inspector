import request from '@/utils/request';

// 待申诉列表
export async function queryPreAppealList(data) {
  return request('/creditAppeal/queryPreAppealDataPage', { method: 'post', data });
}

// 发起一次申诉
export async function startFirstAppeal(params) {
  const data = {...params};
  return request('/creditAppeal/startAppeal', { method: 'post', data });
}
