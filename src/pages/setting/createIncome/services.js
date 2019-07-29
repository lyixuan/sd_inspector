import request from '@/utils/request';

// 获取绩效包
export async function getAchievementList(params) {
  return request('/orgMap/getOrgMapList', { params });
}

// 获取绩效包
export async function getArchiveList(params) {
  // return request('/orgMap/getOrgMapList', { params });
}

