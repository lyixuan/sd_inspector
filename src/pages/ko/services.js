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
export async function getSankeyMapOrg(params1,params2) {
  const response = await request('/homePage/sankeyMapOrg', { params1 });
  // todo 处理返回数据 作为二次接口参数
  let response2 = [];
  let result;
  if (response) {
    // 桑吉图数据接口
    response2 = await request('/homePage/sankeyMapData', { params2 });
    result = fun();
  }
  function fun() {
    // todo  合并接口1 接口2的数据，处理结构
    const rs = '';
    return rs;
  }
  return result;
}

// table 列表数据
export async function getTableList(params) {
  return request('/homePage/userList', { params });
}

// bar 数据
export async function getBarData(params) {
  return request('/homePage/userList', { params });
}
