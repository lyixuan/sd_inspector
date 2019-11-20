import request from '@/utils/request';

// 问卷调查
export async function getKpiInfo(params) {
  return request('/deskperfpcapi/workbenchIncomeKpi/getKpiInfo', { method: 'get', data: params })
}
