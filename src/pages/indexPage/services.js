import request from '@/utils/request';
export async function getUserInfo(params) {
  return request('/deskperfpcapi/user/info', { method: 'get', params });
}
// 查询组织架构
export async function getOrgMapList(params) {
  return request('/orgMap/getOrgMapList', { params });
}
// 人均在服学员列表
// export async function kpiLevelList(params) {
//   return request('/deskperfpcapi/scorePk/kpiLevel/list', { method: 'get', params })
// }
// 学分对比—小组排行
// export async function groupList(params) {
//   return request('/deskperfpcapi/scorePk/group/list', { method: 'POST', data: params })
// }
// 家族-学院列表
export async function getIncomeCollegeList(params) {
  return request('/orgMap/findCollegeShortNameList', { method: 'get', params });
}

// 问卷调查
export async function getQuestionCheckUser(params) {
  return request('/questionPage/checkUser', { method: 'get', data: params });
}
// 问卷调查提交
export async function postWriteQuestion(data) {
  return request('/questionPage/writeQuestion', { method: 'POST', data });
}

// //学分对比柱状图
// export async function queryAppealDataPage(data) {
//   return request('/credit/queryAppealDataPage', { method: 'POST', data: data });
// }
// //获取学院性质的接口
// export async function getFamilyType(params) {
//   return request('/orgMap/getFamilyType', { method: 'get', params });
// }

// // 学分对比组织架构列表接口
// export async function getOrgList(params) {
//   return request('/credit/getOrgList', { method: 'get', params });
// }

// //获取学院性质的接口
// export async function getCurrentFamilyType(params) {
//   return request('/orgMap/getCurrentFamilyType', { method: 'get', params });
// }

// 获取当前绩效周期
export async function getCurrentDateRange(params) {
  return request('/deskperfpcapi/incomeKpiCommon/getCurrentDateRange', { method: 'get', params });
}

// l
export async function getWorkbenchScore(params) {
  return request('/workbench/score', { params });
}

// 获取nps
export async function getNpsData(data) {
  return request('/workbench/nps', { method: 'POST', data });
}

export async function getImNegativeData(params) {
  return request('/im/getImReverseSideDataV2', { method: 'get', params });
}

export async function getImPieData(data) {
  return request('/deskperfpcapi/im/reasonListV2', { method: 'POST', data });
}
