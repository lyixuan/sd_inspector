import request from '@/utils/request';
// 查询用户列表
export async function queryUserList(data) {
  return request('/quality/addQuality', { method: 'post', data });
}
