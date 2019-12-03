import request from '@/utils/request';

export async function getOrgMapTreeByRole() {
  return request('/orgMap/getOrgMapTree');
}

export async function qualitySurveyData(data) {
  return request('/qualityReport/countViolationSceneReport', { method: 'post', data });
}

// 有效范围
export async function getTimeRange() {
  return request('/incomeOrder/dateRangeList');
}

// 当期
export async function getCurrentDateRange(params) {
  return request('/deskperfpcapi/incomeKpiCommon/getCurrentDateRange', { method: 'get', params });
}
