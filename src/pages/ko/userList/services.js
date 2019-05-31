import request from '@/utils/request';

// table 列表数据
export async function getTableList(data) {
  return request('http://172.16.109.173:8085/homePage/userList', { method: 'post', data, prefix: null });
}

// 创建用户组 校验
export async function userGroupCheck(data) {
  return request('http://172.16.109.173:8085/userGroup/create/check', { method: 'post', data, prefix: null });
}
// 创建用户组 提交
export async function userGroupSubmit(data) {
  return request('http://172.16.109.173:8085/userGroup/create/submit', { method: 'post', data, prefix: null });
}
