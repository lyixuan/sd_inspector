import request from '@/utils/request';

// 创建用户组
export async function userGroupList(params) {
  return request('/userGroup/list', { method: 'get', params });
}


// 编辑用户组
export async function userGroupEdit(data) {
  return request('/userGroup/updateGroupName', { method: 'post', data });
}

// 删除用户组
export async function userGroupDelete(data) {
  return request('/userGroup/delete', { method: 'post', data });
}

// 用户组更新
export async function userGroupUpdate(data) {
  return request('/userGroup/update', { method: 'post', data });
}
