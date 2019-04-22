import request from '@/utils/request';
import { msgF } from '@/utils/utils';

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
export async function getPageList(params) {
  return request('/homePage/pageDetailInfoList', { params });
}

// 桑吉图接口
export async function getSankeyData(params, formParams) {
  let result = { code: 20000, msg: "成功", data: [] };
  const response = await request('/homePage/sankeyMapOrg', { params });
  if (response.code === 20000) {
    const params2 = dealMapOrg(response.data, formParams);
    const response2 = await request('/homePage/sankeyMapData', { params2 });
    if (response2.code === 20000) {
      result.data = dealResultData(response.data, response2.data);
    } else {
      result.code = -1;
      result.msg = msgF(response2.msg, response2.msgDetail);
    }
  } else {
    result.code = -1;
    result.msg = msgF(response.msg, response.msgDetail)
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

function dealMapOrg(data, formParams) {
  const data1 = {
    "downPageList": [
      {
        "page": "in aute",
        "pageKey": "fugiat aute",
        "action_key_id": "esse veniam adipisicing",
        "action_key": "veniam magna consectetur ea aliquip",
        "downPage": "anim amet reprehenderit pariatur nulla",
        "downPageKey": "pariatur eiusmod occaecat",
        "pageName": "cupidatat reprehenderi",
        "orderNo": -95012603.42110287,
        "downPageName": "commodo pariatur incididunt"
      },
    ],
    "upPageList": [
      {
        "page": "sunt et",
        "action_key_id": "veniam magna consectetur ea aliquip",
        "action_key": "veniam magna consectetur ea aliquip",
        "pageName": "adipisicing non ut dolor",
        "pageKey": "proident dolor labore est do",
        "orderNo": -58347709.499044955,
        "downPage": "aliquip non commodo consequat",
        "downPagekey": "veniam ea",
        "downPageName": "ipsum nisi"
      },
    ]
  };
  let pageList = new Set();
  let actionList = new Set();
  data1.upPageList && data1.upPageList.forEach((v) => {
    pageList.add(v.downPagekey);
    actionList.add(v.action_key);
  });
  data1.downPageList && data1.downPageList.forEach((v) => {
    pageList.add(v.pageKey);
    actionList.add(v.action_key);
  });
  pageList = Array.from(pageList);
  actionList = Array.from(actionList);

  return { pageList, actionList, formParams };
}
function dealResultData(data1, data2) {
  // todo  合并接口1 接口2的数据，处理结构
  const rs = '';
  return rs;
}

