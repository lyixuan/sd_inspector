import request from '@/utils/request';
import uploadRequest from '@/utils/uploadRequest'

// 查询组织架构
export async function getOrgMapList(params) {
  return request('/orgMap/getOrgMapList', { params });
}

// 查询分维
export async function getDimensionList(params) {
  return request('/dimension/rootList', { params });
}
////根据邮箱获取组织信息
export async function getOrgMapByMail(params) {
  return request('/orgMap/getOrgMapByMail', { params });
}
// 获取子订单详情
export async function getOrderNum(params) {
  return request('/quality/getOrderNum', { params });
}
// 申诉详情页面
export async function getAppealDetail(params) {
  return request('/appeal/getAppealInfo', { params });
}
// 质检详情页面
export async function getQualityDetail(params) {
  return request('/quality/getQualityInfo', { params });
}
// 上传附件
export function uploadAttachment() {
  return uploadRequest('/quality/uploadAttachment');
}

