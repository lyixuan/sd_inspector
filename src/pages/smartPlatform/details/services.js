import request from '@/utils/request';

// 获取考期列表
export async function getExamList() {
  return request('/detail/getExamList', { prefix: '/tmpApi' });
}

// 数据明细查询结果
export async function getDetailDataPage(params) {
  return request('/detail/queryDetailDataPage', {
    method: 'post',
    data: params,
    prefix: '/tmpApi',
  });
}

// 我的查询条件
export async function getQueryConditionList() {
  return request('/detail/getQueryConditionList', { prefix: '/tmpApi' });
}

// 添加查询条件
export async function addQueryCondition(params) {
  return request('/detail/addQueryCondition', { method: 'post', data: params, prefix: '/tmpApi' });
}

// 修改查询条件
export async function updateQueryCondition(params) {
  return request('/detail/updateQueryCondition', {
    method: 'post',
    data: params,
    prefix: '/tmpApi',
  });
}

// 删除查询条件
export async function deleteQueryCondition(params) {
  return request('/detail/deleteQueryCondition', {
    method: 'post',
    data: params,
    prefix: '/tmpApi',
  });
}

// 添加下载任务
export async function addTask(params) {
  return request('/detail/addTask', { method: 'post', data: params, prefix: '/tmpApi' });
}
