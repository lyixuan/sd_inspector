import request from '@/utils/request';

// 提交
export async function saveUserDemand(params) {
  return request('/component/saveUserDemand', { method: 'post', data: params });
}

// 获取bannerList
export async function getBannerList() {
  return request('/component/getBannerList');
}
