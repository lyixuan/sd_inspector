import axios from '@/pages/configWords/utils/sscpWebRequest';
import request from '@/utils/request';

export function getAnswer(param) {
  return axios.get(`/guessTemp/getAnswer?robotId=${param.robotId}&questionId=${param.questionId}`)
}


// 学分对比组织架构列表接口
export async function getOrgList(params) {
  return request('/orgMap/getOwnExamMapList', { method: 'get', params });
}

// 获取机器人会话数据
export async function dialoguDataList(params) {
  return request('/robotDialog/aiDialogueData/list', { method: 'post', data: params });
}

// 机器人会话趋势满意度接口
export async function getDayData(params) {
  return request('/robotDialogTrend/getDayDate', { method: 'post', data: params });
}
// 机器人会话趋势饼状图接口
export async function getDialogAndEvaluateData(params) {
  return request('/robotDialogTrend/getDialogAndEvaluateData', { method: 'post', data: params });
}