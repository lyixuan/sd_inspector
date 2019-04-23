import request from '@/utils/request';

// table 列表数据
export async function getTableList(params) {
  return request('/homePage/userList', { params });
}
