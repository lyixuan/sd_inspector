import request from '@/utils/request';

// 图片上传
export async function uploadMultipleFile(data) {
  return request('/creditAppeal/uploadMultipleFile',{ method: 'post', data });
}
// 发起一次申诉
export async function startAppeal(params) {
  const data = {...params,...{type:1}};
  return request('/creditAppeal/startAppeal', { method: 'post', data });
}
