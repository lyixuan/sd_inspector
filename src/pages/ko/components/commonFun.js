import {PAGE_KEY_ARR} from '@/utils/constants';

// 桑吉图数据结构 demo
// const data1 = {
//   "downPageList": [
//   {
//     "page": "in aute",
//     "pageKey": "fugiat aute",
//     "action_key_id": "esse veniam adipisicing",
//     "action_key": "veniam magna consectetur ea aliquip",
//     "downPage": "anim amet reprehenderit pariatur nulla",
//     "downPageKey": "pariatur eiusmod occaecat",
//     "pageName": "cupidatat reprehenderi",
//     "orderNo": 2,
//     "downPageName": "commodo pariatur incididunt"
//   },
// ],
//   "upPageList": [
//   {
//     "page": "sunt et",
//     "action_key_id": "veniam",
//     "action_key": "veniam magna consectetur ea aliquip",
//     "pageName": "adipisicing non ut dolor",
//     "pageKey": "proident dolor labore est do",
//     "orderNo": 1,
//     "downPage": "aliquip non commodo consequat",
//     "downPagekey": "veniam ea",
//     "downPageName": "ipsum nisi"
//   },
// ]
// }
// 桑吉图数据 demo
// const data2 = {
//     "pageEventData": [
//       {
//         "clickNum": 16198937.576634526,
//         "clickPeople": 18265575.948332787,
//         "pageKey": "sunt qui"
//       },
//     ],
//     "actionEventData": [
//       {
//         "actionKey": "tempor voluptate aute",
//         "actionKeyId": "dolore mollit nulla",
//         "clickNum": 36397845.29906312,
//         "clickPeople": -23918351.228441194
//       },
//     ]
// };

function dealData1(data1) {
  /**
   * 处理data1(桑吉图结构)原始数据
   *
   * 原始结构：
   * [{page:'',pageKey:'',actionKeyId:'',actionKey:'',downPageName:'',actionName:''}]
   * 关系：page --1:1-- actionKeyId --1:n-- pageKey
   *
   * 输出结构：
   * [{page:'',pageKeys:[],actionKeyId:'',actionKey:'',downPageName:'',actionName:'',zb:'',pv:'',value:''}]
   * 关系：page --1:1-- actionKeyId --1:1-- pageKeys
   * */
  const tempObj = {};
  const newList = [];
  data1.forEach((v) => {
    if (!tempObj[v.page]) {
      v.pageKeys = [v.pageKey];
      tempObj[v.page] = { v };
    } else {
      tempObj.pageKeys.push(v.pageKey);
    }
  });
  Object.keys(tempObj).forEach((v) => {
    newList.push(tempObj[v]);
  });
  return newList;
}

function addObjectItem(newData1,pageEventData,actionEventData) {
  /**
   * 1、为 newData1 (桑吉图结构)子对象添加 页面点击量（pv）字段
   * 2、为 newData1 (桑吉图结构)子对象添加 页面流量（value）字段，即actionKeyId的点击量
   * 3、为 newData1 (桑吉图结构)子对象添加 点击人数（clickPeople）字段
   * 4、为 newData1 (桑吉图结构)子对象添加 点击次数（clickNum）字段
   * 5、为 newData1 (桑吉图结构)子对象添加 人数占比（clickPeoplePro）字段
   * 6、为 newData1 (桑吉图结构)子对象添加 次数占比（clickNumPro）字段
   * return newData1
   * */
  newData1.upPageList.forEach((v) => {
    v.pageKeys.forEach((v1)=>{
      pageEventData.forEach((p1)=>{
        // pv：pageKey 的点击量之和
        if (v1.pageKey === p1.pageKey) {
          if (!v.pv) {
            v.pv = Number(p1.clickNum);
          } else {
            v.pv += Number(p1.clickNum);
          }
        }
      });
    });
    actionEventData.forEach((a1)=>{
      if (v.actionKeyId === a1.actionKeyId) {
        // value：流量为actionKeyId的点击量
        if (!v.value) {
          v.value = Number(a1.clickNum);
        } else {
          v.value = Number(a1.clickNum);
        }
        // clickNum：热点点击量为 actionKeyId 的点击量
        if (!v.clickNum) {
          v.clickNum = Number(a1.clickNum);
        } else {
          v.clickNum = Number(a1.clickNum);
        }
        // clickPeople：热点点击人数为 actionKeyId 的点击人数
        if (!v.clickPeople) {
          v.clickPeople = Number(a1.clickPeople);
        } else {
          v.clickPeople = Number(a1.clickPeople);
        }
      }
      // 点击量占比
      v.clickNumPro =(a1.clickNum / v.clickNum).toFixed(4) * 100 + '%'; //小数点后两位百分比
      // 人数击量占比
      v.clickPeoplePro =(a1.clickPeoplePro / v.clickPeoplePro).toFixed(4) * 100 + '%'; //小数点后两位百分比
    });
  });
  return newData1;
}
export function dealMapOrg(data, currentPage, formParams,currentActionKeyId) {
  /**
  * 基于结构数据data，构造下一个接口需要的参数
  * return  所有pageKey，所有actionKeyId，当前页的action对象，currentActionKeyId详情页的id，form表单所有选项
  * */
  let pageKeyList = new Set();
  let actionKeyList = new Set();
  let currentActionList = new Set();

  data.upPageList && data.upPageList.forEach((v) => {
    pageKeyList.add(currentPage);
    actionKeyList.add(v.actionKeyId);
    if (v.page === currentPage) {
      currentActionList.add({actionKeyId: v.actionKeyId,actionKey:v.actionKey,actionName:v.actionName});
    }
  });
  data.downPageList && data.downPageList.forEach((v) => {
    pageKeyList.add(v.pageKey);
    actionKeyList.add(v.actionKeyId);
    if (v.page === currentPage) {
      currentActionList.add({actionKeyId: v.actionKeyId,actionKey:v.actionKey,actionName:v.actionName});
    }
  });
  pageKeyList = Array.from(pageKeyList);
  actionKeyList = Array.from(actionKeyList);

  return { pageKeyList, actionKeyList,currentActionList,formParams,currentActionKeyId };
}

export function dealResultData(data1, data2, currentPage) {
  let newData1 = {
    upPageList:[],
    downPageList:[],
  };

  // 基于page合并去重
  newData1.upPageList = dealData1(data1.upPageList);
  newData1.downPageList = dealData1(data1.downPageList);

  // 为newData1添加 pv（页面点击量) 和 value（actionKeyId的点击量，即page到pageDown的流量）
  newData1.upPageList = addObjectItem(newData1.upPageList,data2.pageEventData,data2.actionEventData);
  newData1.downPageList = addObjectItem(newData1.upPageList,data2.pageEventData,data2.actionEventData);


  // 将 newData1，构造为桑吉图需要的如下结构的数据，并处理特殊节点
  const upPage = {
    node: [],
    links: [],
  };
  const downPage = {
    node: [],
    links: [],
  };

  data1.upPageList.forEach((v) => {
    if (v.page === currentPage) {
      v.pageName = '下游页面';
    }
    upPage.node.push({ id: v.page, name: v.pageName });
    upPage.links.push({
      source: v.page,
      target: v.actionKeyId,
      pv: v.pv,
      zb: v.clickNumPro,
      value: v.value,
    });
  });
  data1.downPageList.forEach((v) => {
    if (v.page === currentPage) {
      v.pageName = '上游页面';
    }
    downPage.node.push({ id: v.page, name: v.pageName });
    downPage.links.push({
      source: v.page,
      target: v.downPage,
      pv: v.pv,
      zb: v.zb,
      value: v.value,
    });
  });

  return { newData1,upPage, downPage };
}

