import axios from '@/pages/configWords/utils/sscpWebRequest';

// 请求知识库列表
export function getKnowledgeList() {
  return axios.get('/knowledge/list')
}

// 根据知识库类型请求问题分类
export function getQuestionType(id) {
  if (!id) {
    return axios.get('/questionType/list')
  }
  return axios.get(`/questionType/list?knowledgeId=${id}`)
}

// 根据知识库类型和问题分类请求问题列表
export function getQuestion(knowledgeId, questionTypeId) {
  questionTypeId = questionTypeId ? questionTypeId : 0;
  return axios.get(`/question/${knowledgeId}/${questionTypeId}`)
}