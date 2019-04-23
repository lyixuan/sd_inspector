import request from '@/utils/request';

// table 列表数据
export async function getTableList(data) {
  return request('/homePage/userList', {method: 'post', data });
}
