import request from '@/utils/request';

import uploadRequest from '@/utils/uploadRequest'
// 图片上传
export function uploadMultipleFile() {
  return uploadRequest('/creditAppeal/uploadMultipleFile');
}
// 发起一次申诉
export async function startFirstAppeal(params) {
  const data = {...params};
  return request('/creditAppeal/startAppeal', { method: 'post', data });
}
