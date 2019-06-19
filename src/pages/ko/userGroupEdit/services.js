import request from '@/utils/request';

// 用户组 编辑 输入编号
export async function userGroupInput(data) {
  return request('/userGroup/edit/input', { method: 'post', data });
}

// 用户组 编辑 校验编号
export async function userGroupCheck(data) {
  return request('/userGroup/edit/check', { method: 'post', data });
}
