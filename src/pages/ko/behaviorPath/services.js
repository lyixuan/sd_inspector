import request from '@/utils/request';

// export async function getDateList() {
//   return request('/userTrack/getEffectDateList');
// }
// im
export async function imAct(params) {
  return request('/userTrack/imAct', { method: 'post', data: params });
}
// bbs
export async function bbsAct(params) {
  return request('/userTrack/bbsAct', { method: 'post', data: params });
}
// 私信
export async function chatMessageAct(params) {
  return request('/userTrack/chatMessageAct', { method: 'post', data: params });
}
// 微信
export async function wechatAct(params) {
  return request('/userTrack/wechatAct', { method: 'post', data: params });
}
// 学习
export async function learningAct(params) {
  return request('/userTrack/learningAct', { method: 'post', data: params });
}
// 获取日期列表
// export async function getDateList2(params) {
//   return request('/userTrack/getDateList', { method: 'post', data: params });
// }
export async function getDateList2(params) {
  return request('/userTrack/getDateList', { method: 'post', data: params, prefix: null });
}
// 获取日期范围
export async function getDateRange() {
  return request('/userTrack/getEffectiveDateRange');
}
// 获取用户基本详情
// export async function userInfo(params) {
//   return request('/homePage/userBaseInfo', { params });
// }
export async function userInfo(params) {
  return request('/homePage/userBaseInfo', { params, prefix: null });
}