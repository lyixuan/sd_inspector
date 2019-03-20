
import request from '@/utils/request';

// 任务列表
export async function getOrgMapList(params) {
  return request('/orgMap/getTaskPage', { params });
}