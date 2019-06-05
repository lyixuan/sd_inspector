import request from '@/utils/request';

import uploadRequest from '@/utils/uploadRequest';
// 用户组 - 添加用户组 - 选择文件
export async function selectFile(data) {
  return request('/userGroup/add/selectFile', { method: 'post', data });
}
// 用户组 - 添加用户组 - 校验文件
export async function checkFile(data) {
  return request('/userGroup/add/checkFile', { method: 'post', data });
}
// 用户组 - 添加用户组 - 上传文件
export function uploadFile() {
  return uploadRequest('/userGroup/add/uploadFile');
}

