import request from '@/utils/request';

// 班主任分层 - 本期创收 - 综合对比
export async function getContrastIncomeKpiPkList(params) {
    return request('/workbenchIncomeKpi/incomeKpiPkList', { method: 'get', params });
}
// 班主任分层 - 本期创收 - 查询对比小组
export async function getIncomeKpiPkList(params) {
    return request('/workbenchIncomeKpi/getIncomeKpiPkList', { method: 'get', params });
}
// 班主任分层 - 本期创收 - 个人信息
export async function getIncomeKpiPersonInfo(params) {
    return request('/workbenchIncomeKpi/incomeKpiPersonInfo', { method: 'get', params });
}
// 班主任工作台 - 本期质检统计
export async function getCountCurrentQuality(params) {
    return request('/classWorkbench/countCurrentQuality', { method: 'get', params });
}
// 班主任工作台 - 我的申诉统计
export async function getCountAppealRecord(params) {
    return request('/classWorkbench/countAppealRecord', { method: 'get', params });
}
