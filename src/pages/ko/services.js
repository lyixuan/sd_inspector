import request from '@/utils/request';
import { msgF } from '@/utils/utils';
import { dealMapOrg,dealResultData } from '@/pages/ko/components/commonFun';

// 页面枚举接口
export async function getKOEnumList(params) {
  return request('/homePage/enumList', { params });
}
// 获取配置时间接口
export async function getKoDateRange(params) {
  return request('/time/getKoDateRange', { params, prefix: '/oldApi' });
}
// 获取配置文案接口
export async function getKOMessage(params) {
  return request('/certificationItem/getKOMessage', { params, prefix: '/oldApi' });
}
// 页面下拉二级列表
export async function getPageDetailInfoList(params) {
  return request('/homePage/pageDetailInfoList', { params });
}


// table 列表数据
export async function getTableList(params) {
  return request('/homePage/userList', { params });
}

// bar 数据
export async function getBarData(params) {
  return request('/homePage/userList', { params });
}

