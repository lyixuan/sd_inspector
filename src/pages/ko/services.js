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
// 桑吉图接口
export async function getSankeyData(params,formParams) {
  let result = {code:20000,msg:"成功",data:{ behaviourData:[],sankeyData:{} }};
  const response = await request('/homePage/sankeyMapOrg', { params });
  if (response.code === 20000) {
    const params2 = dealMapOrg(response.data,formParams);
    const response2 = await request('/homePage/sankeyMapData', { params2 });
    if (response2.code === 20000) {
      result.data.sankeyData = dealResultData(response.data,response2.data.sankeyData);
      result.data.behaviourData = response2.data.behaviourData
    } else {
      result.code = -1;
      result.msg = msgF(response2.msg,response2.msgDetail);
    }
  } else {
    result.code = -1;
    result.msg = msgF(response.msg,response.msgDetail)
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

