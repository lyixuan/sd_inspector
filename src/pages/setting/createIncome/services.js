import request from '@/utils/request';

// 获取绩效包
export async function getAchievementList(params) {
  return request('/orgMap/getOrgMapList', { params });
}

export async function getTimeRange() {
  return request('/incomeOrder/dateRangeList' );
}

export async function updateTimeRange(data) {
  return request('/incomeOrder/updateDateRange', { method: 'post', data });
}
