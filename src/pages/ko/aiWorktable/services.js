import request from '@/utils/request';

// table 列表数据
export async function getTableList(data) {
  return request('/homePage/userList', { method: 'post', data });
}

// 创建用户组 校验
export async function userGroupCheck(data) {
  return request('/userGroup/create/check', { method: 'post', data });
}
// 创建用户组 提交
export async function userGroupSubmit(data) {
  return request('/userGroup/create/submit', { method: 'post', data });
}
