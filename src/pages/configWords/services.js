import axios from './utils/sscpWebRequest';

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

// 请求关键词列表
export function getKeywordsList(keyword, pageIndex, pageSize) {
  let data = {pageIndex, pageSize};
  if (keyword !== '') {
    data.keyWord = keyword;
  }
  return axios.post('/keyWord/list', {
    ...data
  })
}

// 请求实体词列表
export function getEntityWordsList(page, pageSize) {
  return axios.post('/keyWordEntity/list', {
    pageIndex: page,
    pageSize: pageSize
  })
}

// 请求组合词列表
export function getCombineWordsList(keyword, pageIndex, pageSize) {
  let data = {pageIndex, pageSize};
  if (keyword !== '') {
    data.keyWord = keyword;
  }
  return axios.post('/keyWordGroup/list', {
    ...data
  })
}

// 获取关键词下拉列表
export function getKeywordsOptionList() {
  return axios.get('/keyWord/simpleList')
}

// 验证关键词是否重复
export function validateKeywords(id, keyword) {
  return axios.get(`/keyWord/validate/${id}/${keyword}`)
}

// 保存关键词配置
export function saveKeywordsConfig(data) {
  return axios.post('/keyWord/save', {
    ...data
  })
}

// 删除关键词配置
export function deleteKeywordsConfig(id) {
  return axios.post(`/keyWord/delete/${id}`)
}

// 获取选择实体词时的下拉框列表
export function getEntityOptionList() {
  return axios.get('/entityWord/list')
}

// 验证实体词
export function validateEntityWords(id, entityWordId) {
  return axios.get(`/keyWordEntity/validate/${id}/${entityWordId}`)
}

// 保存实体词配置
export function saveEntityConfig(data) {
  return axios.post('/keyWordEntity/save', {
    ...data
  })
}

// 删除实体词配置
export function deleteEntityConfig(id) {
  return axios.post(`/keyWordEntity/deleteEntity/${id}`)
}

// 验证组合词
export function validateCombineWords(data) {
  return axios.post('/keyWordGroup/validate', {
    ...data
  })
}

// 保存组合词配置
export function saveCombineConfig(data) {
  return axios.post('/keyWordGroup/save', {
    ...data
  })
}

// 删除组合词配置
export function deleteCombineConfig(id) {
  return axios.post(`/keyWordGroup/delete/${id}`)
}
