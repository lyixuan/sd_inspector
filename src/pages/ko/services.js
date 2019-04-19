import request from '@/utils/request';

// 页面枚举接口
export async function getKOEnumList(params) {
    return request('/homePage/enumList', { params });
}

// 页面下拉二级列表
export async function getPageList(params) {
  return request('/homePage/pageDetailInfoList', { params });
}

// 桑吉图结构接口
export async function getSankeyMapOrg(params) {
  return request('/homePage/sankeyMapOrg', { params });
}

// 桑吉图数据接口
export async function getSankeyMapData(params) {
  return request('/homePage/sankeyMapData', { params });
}


// table列表数据
export async function getDataList(params) {
  return request('/homePage/sankeyMapData', { params });
}
