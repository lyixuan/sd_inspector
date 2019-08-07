import request from '@/utils/request';

// 查询列表
export async function getList() {
  return request('/shinecollege/exam/list' );
}

