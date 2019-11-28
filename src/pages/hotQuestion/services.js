import axios from '@/pages/configWords/utils/sscpWebRequest';

// 请求知识库列表
export function getKnowledgeList() {
  return axios.get('/knowledge/list')
}

// 根据知识库类型请求问题分类
export function getQuestionType(id) {
  return axios.get(`/questionType/list?knowledgeId=${id}`)
}

// 根据知识库类型和问题分类请求问题列表
export function getQuestionList(param) {
  return axios.get(`/question/${param.knowledgeId}/${param.questionTypeId}`)
}