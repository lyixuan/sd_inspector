
import request from '@/utils/request';

// 任务列表
export async function getOrgMapList(params) {
  return request('/orgMap/getTaskPage', { params });
}
// 新建质检
export async function addQuality(data) {
  return request('/quality/addQuality', {
    method: 'POST',
    data,
  });
}