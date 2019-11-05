import request from '@/utils/request';

// // 获取绩效包时间列表
// export async function getArchiveList() {
//   return request('/incomeOrder/findKpiPackageDateList');
// }

// 获取屏蔽人名单
export async function getIgnoreUser() {
  return request('/weekReport/initLastIgnoreUsers');
}

// 发送邮件
export async function send(data) {
  return request('/weekReport/sendMail', { method: 'post', data });
}

// check发送邮件
export async function checkSend(data) {
  return request('/weekReport/checkSendMail');
}

