import axios from '@/pages/configWords/utils/sscpWebRequest';
import request from '@/utils/request';

export function getAnswer(param) {
  return axios.get(`/guessTemp/getAnswer?robotId=${param.robotId}&questionId=${param.questionId}`)
}


// 学分对比组织架构列表接口
export async function getOrgList(params) {
  return request('/credit/getOrgList', { method: 'get', params });
}