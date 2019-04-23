import request from '@/utils/request';

export async function getDateList() {
  return request('/userTrack/getEffectDateList');
}

export async function imAct(params) {
  return request('/userTrack/imAct', { method: 'post', data: params });
}