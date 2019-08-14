import request from '@/utils/request';

// 查询列表
export async function getList(params) {
  return request('/shinecollege/videos/list', { params });
}

// 删除
export async function delelte(params) {
  return request('/shinecollege/videos/delete', { params });
}
//  添加
export async function addData(data) {
  return request('/shinecollege/videos/add', { method: 'post', data });
}

//  编辑
export async function updateData(data) {
  return request('/shinecollege/videos/update', { method: 'post', data });
}

// 获取课程分类下的课程
export async function getCourseTypeChildren(params) {
  return request('/shinecollege/videos/findData', { params });
}


//  课程排序
export async function sortData(data) {
  return request('/shinecollege/videos/sortVideo', { method: 'post', data });
}

