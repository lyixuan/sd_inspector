import request from '@/utils/request';
// 文件上传
export async function uploadFile(params) {
  return request('/quality/uploadAttachment_1553150677302');
}

// 申诉 - 主管复审申诉接口
export async function reviewAppel(params) {
  return request('/appeal/masterCheckAppeal', { method: 'post', data: params });
}
