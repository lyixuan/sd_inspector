import request from '@/utils/request';

// 查询列表
export async function getList(params) {
  return request('/shinecollege/videos/list', { params });
}


