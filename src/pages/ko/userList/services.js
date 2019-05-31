import request from '@/utils/request';

// table 列表数据
export async function getTableList(data) {
  return request('http://172.16.109.173:8085/homePage/userList',  { method: 'post', data: data, prefix: null });
}
