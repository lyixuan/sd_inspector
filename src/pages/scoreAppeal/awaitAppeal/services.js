import request from '@/utils/request';

// 待申诉列表
export async function queryPreAppealList(data) {
  return request('/creditAppeal/queryPreAppealDataPage', { method: 'post', data });
}

