import request from '@/utils/request';
import axios from '@/pages/configWords/utils/sscpWebRequest';
import {BASE_URL} from '../constants/miniProgramHost';

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

export async function getMiniProgramCode(params) {
  const {uid, componentCode} = params;
  return axios({
    method: 'get',
    baseURL: BASE_URL,
    url: `/qrcode/create/${uid}/${componentCode}`
  });
}

export async function getCopyUrl(params) {
  return request('/component/getCopyUrl',{params});
}

