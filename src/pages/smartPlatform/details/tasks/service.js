import request from '@/utils/request';

// 任务列表
export async function getTaskPage(params) {
  return request('/detail/getTaskPage');
}

// 删除任务
export async function deleteTask(params) {
  return request('/detail/deleteTask', { method: 'post', data: params });
}

// 重新加载任务
export async function reloadTask(params) {
  return request('/detail/reloadTask', { method: 'post', data: params });
}
