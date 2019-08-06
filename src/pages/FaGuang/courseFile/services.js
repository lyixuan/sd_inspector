import request from '@/utils/request';

// 查询列表
export async function getList(params) {
  return request('/shinecollege/courseware/list', { params });
}

// 删除
export async function delelte(params) {
  return request('/shinecollege/courseware/delete', { params });
}
//  添加
export async function addData(data) {
  return request('/shinecollege/courseware/delete', { method: 'post', data });
}

