import request from '@/utils/request';

// 获取绩效包时间列表
export async function getArchiveList() {
  return request('/incomeOrder/findKpiPackageDateList');
}

// 获取存档历史记录列表
export async function getBatchLogList() {
  return request('/incomeOrder/batchLogList');
}

// 添加存档
export async function saveBatchLog(data) {
  return request('/incomeOrder/saveBatchLog', { method: 'post', data });
}

// 取消存档
export async function cacelBatchLog(data) {
  return request('/incomeOrder/cacelBatchLog', { method: 'post', data });
}

export async function getTimeRange() {
  return request('/incomeOrder/dateRangeList');
}

export async function updateTimeRange(data) {
  return request('/incomeOrder/updateDateRange', { method: 'post', data });
}
// 日报月报下载
export async function reportExcelDownload(data) {
  return request('/incomeOrder/reportExcelDownload', { method: 'post', data,responseType:'blob',getResponse: true  });
}

