import request from '@/utils/request';



// 创建用户组
export async function userGroupList(params) {
  return request('http://172.16.109.173:8085/userGroup/list', { method: 'get', params, prefix: null });
}


// 编辑用户组
export async function userGroupEdit(data) {
  return request('http://172.16.109.173:8085/userGroup/updateGroupName', { method: 'post', data, prefix: null });
}

// 删除用户组
export async function userGroupDelete(data) {
  return request('http://172.16.109.173:8085/userGroup/delete', { method: 'post', data, prefix: null });
}
