import request from '@/utils/request';

// 任务列表
export async function getTaskPage() {
  return request('/detail/getTaskPage');
}

// 删除任务
export async function deleteTask(params) {
  return request('/detail/deleteTask', {method: 'delete',params});
}

// 删除任务
export async function reloadTask(params) {
  return request('/detail/reloadTask', {method: 'put',params});
}
