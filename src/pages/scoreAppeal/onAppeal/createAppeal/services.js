import request from '@/utils/request';
import uploadRequest from '@/utils/uploadRequest'
// 图片上传
export function uploadMultipleFile() {
  return uploadRequest('/creditAppeal/uploadMultipleFile');
}
