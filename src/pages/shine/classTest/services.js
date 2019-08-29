import request from '@/utils/request';

// 查询列表
export async function getList(params) {
  return request('/shinecollege/classExam/list', { params } );
}

// 删除
export async function del(params) {
  return request('/shinecollege/classExam/delete', { params });
}

//  编辑
export async function updateData(data) {
  return request('/shinecollege/classExam/update', { method: 'post', data });
}
