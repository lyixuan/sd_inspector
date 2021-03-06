import request from '@/utils/request';
import uploadRequest from '@/utils/uploadRequest';

// 查询组织架构
export async function getOrgMapList(params) {
  return request('/orgMap/getOrgMapList', { params });
}
// 查询质检申诉管理归属组织架构
export async function getOrgMapTree(params) {
  return request('/orgMap/getOrgMapTree');
}

// 查询分维
export async function getDimensionList(params) {
  return request('/dimension/rootList', { params });
}
export async function getOrgType(data) {
  return request('/quality/getOrgType',  { method: 'post', data });
}
// 分维 违规分类
export async function queryDimensionTreeList(params) {
  return request('/dimension/queryDimensionTreeList', { params });
}

////根据邮箱获取组织信息
export async function getOrgMapByMail(params) {
  return request('/orgMap/getOrgMapByMail', { params });
}
// 获取子订单详情
export async function getOrderNum(params) {
  return request('/quality/getRealOrderNum', { params });
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

//  检验质检单是否重复
export async function checkRepeatQualityInspection(data) {
  return request('/quality/checkRepeatQualityInspection', { method: 'post', data });
}
//  质检-获取责任人处罚力度
export async function getPunishInfoList(data) {
  return request('/qualityRole/getPunishInfoList', { method: 'post', data });
}
