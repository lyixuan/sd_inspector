import request from '@/utils/request';

// 班主任分层 - 本期创收 - 综合对比
export async function getIncomeKpiPkAll(params) {
    return request('/classStratificationIncome/incomeKpiPkAll', { method: 'get', params });
}
// 班主任分层 - 本期创收 - 好推绩效
export async function getIncomeKpiPkGoodpush(params) {
    return request('/classStratificationIncome/incomeKpiPkGoodpush', { method: 'get', params });
}
// 班主任分层 - 本期创收 - 续报绩效
export async function getinComeKpiPkRenewal(params) {
    return request('/classStratificationIncome/incomeKpiPkRenewal', { method: 'get', params });
}
// 班主任分层 - 本期创收 - 成考专本套
export async function getIncomeKpiPkExamZbt(params) {
    return request('/classStratificationIncome/incomeKpiPkExamZbt', { method: 'get', params });
}
// 班主任分层 - 本期创收 - 查询对比小组
export async function getIncomeKpiPkList(params) {
    return request('/classStratificationIncome/getIncomeKpiPkList', { method: 'get', params });
}
// 班主任工作台 - 本期质检统计
export async function getCountCurrentQuality(params) {
    return request('/classWorkbench/countCurrentQuality', { method: 'get', params });
}
// 班主任工作台 - 本期质检统计
export async function getCountAppealRecord(params) {
    return request('/classWorkbench/countAppealRecord', { method: 'get', params });
}
