import request from '@/utils/request';

// 查询列表
export async function getList() {
  return request('/shinecollege/exam/list' );
}

// 获取前端角色
export async function getRole() {
  return request('/shinecollege/role/list' );
}

//  编辑
export async function updateData(data) {
  return request('/shinecollege/exam/update', { method: 'post', data });
}
