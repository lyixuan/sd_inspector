import request from '@/utils/request';

export async function getOrgMapTreeByRole() {
  return request('/orgMap/getOrgMapTree');
}

export async function qualitySurveyData(data) {
  return request('/qualityReport/countViolationSceneReport', { method: 'post', data });
}

export async function qualityAssortmentRank(data) {
  return request('/qualityReport/countAssortmentRank', { method: 'post', data });
}

export async function qualityCountPersonRank(data) {
  return request('/qualityReport/countPersonRank', { method: 'post', data });
}

// 有效范围
export async function getTimeRange() {
  return request('/incomeOrder/dateRangeList');
}

// 当期
export async function getCurrentDateRange(params) {
  return request('/deskperfpcapi/incomeKpiCommon/getCurrentDateRange', { method: 'get', params });
}
