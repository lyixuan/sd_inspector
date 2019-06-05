import request from '@/utils/request';

// 图片上传
export async function uploadMultipleFile(data) {
  return request('/creditAppeal/uploadMultipleFile',{ method: 'post', data });
}

