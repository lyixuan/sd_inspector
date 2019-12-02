import axios from '@/pages/configWords/utils/sscpWebRequest';
import request from '@/utils/request';

// 获取小德系统的用户信息的接口
export function getUserInfo() {
  return request('/deskperfpcapi/user/info', { method: 'get' })
}

// 获取机器人ID
export function getRobotId(data) {
  const { collegeId, familyId, groupId } = data;
  return axios.get(`/robot/findByParam?collegeId=${collegeId}&familyId=${familyId}&groupId=${groupId}`)
}

// 获取机器人列表
export function getRobotList() {
  return axios.get('robot')
}

// 同步机器人配置
export function copyRobot(robots, isSunlands) {
  return axios.post('/guessTemp/synchronize', {
    fromRobotId: 175,
    toRobotIds: robots,
    isSunlands: isSunlands
  }).catch(err => err)
}

// 获取关联问题部分数据
export function getRelationQuestion(robotId, isSunlands) {
  return axios.get(`/similarTemp/getList?robotId=${robotId}&isSunlands=${isSunlands}`);
}

// 获取猜你想问部分数据
export function getGuessQuestion(robotId, isSunlands) {
  return axios.get(`/guessTemp/getList?robotId=${robotId}&isSunlands=${isSunlands}`);
}

// 获取机器人正在进行中的活动
export function getGoingActivity(id) {
  return axios.get(`/activity/getCurrentActivity?robotId=${id}`)
}
// 请求知识库列表
export function getKnowledgeList(id) {
  return axios.get(`/knowledge/list?robotId=${id}`)
}

// 根据知识库类型请求问题分类
export function getQuestionType(id) {
  return axios.get(`/questionType/list?knowledgeId=${id}`)
}

// 根据知识库类型和问题分类请求问题列表
export function getQuestionList(param) {
  return axios.get(`/question/${param.knowledgeId}/${param.questionTypeId}`)
}
// 猜你想问页面回显
export function getGuessData(param) {
  return axios.get(`/guessTemp/getList?robotId=${param.robotId}&isSunlands=${param.isSunlands}&cardId=${param.cardId}`)
}
// 猜你想问默认答案
export function getAnswer(param) {
  return axios.get(`/guessTemp/getAnswer?robotId=${param.robotId}&questionId=${param.questionId}`)
}

// 猜你想问保存
export function guessTempSave(param) {
  return axios.post('/guessTemp/save', param)
}
