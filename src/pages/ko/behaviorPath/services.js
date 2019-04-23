import request from '@/utils/request';

export async function getDateList() {
  return request('/userTrack/getEffectDateList');
}
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