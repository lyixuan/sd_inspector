import request from '@/utils/request';

// 获取绩效包时间列表
export async function getArchiveList() {
  return request('/incomeOrder/findKpiPackageDateList');
}

// 获取存档历史记录列表
export async function getIgnoreUser() {
  return request('/weekReport/initLastIgnoreUsers');
}

// 添加存档
export async function send(data) {
  return request('/weekReport/sendMail', { method: 'post', data });
}
