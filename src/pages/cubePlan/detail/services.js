import request from '@/utils/request';

// 获取详情
export async function getDetail(params) {
  return request('/component/getDetail', { params });
}

// 获取评论
export async function getCommentPage(params) {
  return request('/component/getCommentPage', { params });
}



//  提交评论
export async function saveUserComment(data) {
  return request('/component/saveUserComment', { method: 'post', data });
}
