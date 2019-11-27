import request from '@/utils/request';

export async function getDetail(params) {
  return request('/component/getDetail', { params });
}

export async function getCommentPage(params) {
  return request('/component/getCommentPage', { params });
}

export async function saveUserComment(data) {
  return request('/component/saveUserComment', { method: 'post', data });
}

export async function getOutwardNameList() {
  return request('/component/getOutwardNameList');
}

export async function getQRCode(params) {
  return request('/component/getQRCode',{params});
}
