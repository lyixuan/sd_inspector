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
  return request('/deskperfpcapi/incomeFamily/getCollegeList', { method: 'get', params });
}


// 问卷调查
export async function getQuestionCheckUser(params) {
  return request('/questionPage/checkUser', { method: 'get', data: params })
}
// 问卷调查提交
export async function postWriteQuestion(data) {
  return request('/questionPage/writeQuestion', { method: 'POST', data });
}

//学分对比柱状图
export async function queryAppealDataPage(data) {
  return request('/credit/queryAppealDataPage',{method:'POST',data:data})
}
//获取学院性质的接口
export async function getFamilyType(params) {
  return request('/orgMap/getFamilyType',{method:'get',params})
}

