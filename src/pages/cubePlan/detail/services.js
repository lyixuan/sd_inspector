import request from '@/utils/request';

// 获取详情
export async function getDetail(params) {
  return request('/component/getDetail', { params });
}


