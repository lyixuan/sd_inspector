import request from '@/utils/request';

// 查询列表
export async function getList(params) {
  return request('/shinecollege/practice/list', { params });
}

// 删除
export async function delelte(params) {
  return request('/shinecollege/practice/delete', { params });
}
//  添加
export async function addData(data) {
  return request('/shinecollege/practice/add', { method: 'post', data });
}

//  编辑
export async function updateData(data) {
  return request('/shinecollege/practice/update', { method: 'post', data });
}

// 获取家族列表
export async function getFamilyList(params) {
  return request('/shinecollege/org/familyList',{ params });
}


