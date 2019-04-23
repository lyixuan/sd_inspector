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
   * 关系：page --1:n-- actionKeyId   page --1:n pageKey
   *
   * 输出结构：
   * [{page:'',pageKeys:[],actionKeyIds:
   *     [
   *      {actionKeyId:'',actionKey:'',actionName:'',clickNum:'',clickPeople:'',clickNumPro:'',clickNumPro:'',clickPeoplePro:''}
   *    ],
   *  pv:''
   * }]
   *
   * 关系：page --1:1-- actionKeyIds --1:1-- pageKeys
   * */

  // 合并多个pageKey和多个actionKeyId并去重
  const tempObj = {};
  const newList = [];
  data1.forEach((v) => {
    if (!tempObj[v.page]) {
      v.pageKeys = new Set([v.pageKey]);
      v.actionKeyIds = new Set([v.actionKeyId]);
      tempObj[v.page] = v;
    } else {
      tempObj[v.page].pageKeys.add(v.pageKey);
      tempObj[v.page].actionKeyIds.add(v.actionKeyId);
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
   * 2、为 newData1 (桑吉图结构)子对象添加 点击人数（clickPeople）字段
   * 3、为 newData1 (桑吉图结构)子对象添加 点击次数（clickNum）字段
   * 4、为 newData1 (桑吉图结构)子对象添加 人数占比（clickPeoplePro）字段
   * 5、为 newData1 (桑吉图结构)子对象添加 次数占比（clickNumPro）字段
   * return newData1
   * */
  newData1.upPageList.forEach((v) => {
    v.pageKeys.forEach((v1)=>{
      pageEventData.forEach((p1)=>{
        // pv：pageKey 的点击量之和, pClickPeople页面点击人数
        if (v1.pageKey === p1.pageKey) {
          if (!v.pv) {
            v.pv = Number(p1.clickNum);
            v.pClickPeople = Number(p1.clickPeople);
          } else {
            v.pv += Number(p1.clickNum);
            v.pClickPeople += Number(p1.clickPeople);
          }
        }
      });
    });
    v.actionKeyIds.forEach((v2)=>{
      actionEventData.forEach((a1)=>{
        if (v2.actionKeyId === a1.actionKeyId) {
          // clickNum：热点点击量为 actionKeyId 的点击量
          if (!v2.clickNum) {
            v2.clickNum = Number(a1.clickNum);
          } else {
            v2.clickNum = Number(a1.clickNum);
          }
          // clickPeople：热点点击人数为 actionKeyId 的点击人数
          if (!v2.clickPeople) {
            v2.clickPeople = Number(a1.clickPeople);
          } else {
            v2.clickPeople = Number(a1.clickPeople);
          }
          // 点击量占比
          v2.clickNumPro =(a1.clickNum / v.pv).toFixed(4) * 100 + '%'; //小数点后两位百分比
          // 人数击量占比
          v2.clickPeoplePro =(a1.clickPeople / v.pClickPeople).toFixed(4) * 100 + '%'; //小数点后两位百分比
        }
      });
    });
  });
  console.log(newData1);
  return newData1;
}

function getFirstTen(list) {
  /**
   * actionKeyId取前十
   * */
  // 排序函数，倒叙
  list.sort(function(a,b) {
    if (Number(a.clickNum) > Number(b.clickNum)) {
      return -1;
    } else if (a < b) {
      return 1;
    } else {
      return 0;
    }
  });
  return list.slice(0,9);
}

function getSanKeyMap(newData1,currentPage) {
  /**
   * 构造桑吉图要的数据结构，并处理特殊节点
   * */
  const upPage = {
      node: [],
      links: [],
    };
  const downPage = {
    node: [],
    links: [],
  };

  newData1.upPageList.forEach((v) => {
    if (v.page === currentPage) {
      v.pageName = '下游页面';
    }
    upPage.node.push({ id: v.page, name: v.pageName });

    v.actionKeyIds.forEach((a)=>{
      upPage.links.push({
        source: v.page,
        target: a.actionKeyId,
        pv: v.pv,
        zb: a.clickNumPro,
        value: a.clickNum,
      });
    });
  });
  newData1.downPageList.forEach((v) => {
    if (v.page === currentPage) {
      v.pageName = '上游页面';
    }
    downPage.node.push({ id: v.page, name: v.pageName });

    v.actionKeyIds.forEach((a)=>{
      downPage.links.push({
        source: v.page,
        target: a.actionKeyId,
        pv: v.pv,
        zb: a.clickNumPro,
        value: a.clickNum,
      });
    });
  });
  return {upPage, downPage}
}

function getCurrentPage(downPageList,currentPage) {
  let currentPageObj = {};
  for(let i = 0;i<downPageList.length;i++) {
    if (downPageList[i].page === currentPage){
      currentPageObj = downPageList[i];
      break;
    }
  }
  return currentPageObj;
}

export function dealMapOrg({data, formParams,params,otherParams}) {
  /*
  * 基于结构数据data，构造下一个接口需要的参数
  * */
  const {page:currentPage,belongApp} = params;
  const {currentActionKeyId,recordTimeList} = otherParams;

  let pageKeyList = new Set();
  let actionKeyList = new Set();
  let currentActionList = new Set();

  data.upPageList && data.upPageList.forEach((v) => {
    pageKeyList.add(currentPage);
    actionKeyList.add(v.actionKeyId);
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
  currentActionList = Array.from(currentActionList);

  return { pageKeyList, actionKeyList,currentActionList,formParams,currentActionKeyId,recordTimeList,belongApp };
}

export function dealResultData(data1, data2, currentPage) {
  /*
  * 桑吉接口组合，处理数据
  * */
  let newData1 = {
    upPageList:[],
    downPageList:[],
  };

  console.log(11,data2)
  console.log(11,currentPage)
  // 基于page合并去重
  newData1.upPageList = dealData1(data1.upPageList);
  newData1.downPageList = dealData1(data1.downPageList);

  // 为newData1添加 页面点击量 点击人数等;并取actionKeyId点击量前十
  newData1.upPageList = getFirstTen(addObjectItem(newData1.upPageList,data2.pageEventData,data2.actionEventData));
  newData1.downPageList = getFirstTen(addObjectItem(newData1.downPageList,data2.pageEventData,data2.actionEventData));

  // 构造桑吉图需要的结构，并处理节点
  const {upPage={}, downPage={}}=getSanKeyMap(newData1);

  // 筛选当前页面
  const currentPageObj = getCurrentPage(newData1.downPageList,currentPage);

  return { upPage, downPage,currentPageObj,currentPage, upPageList:newData1.upPageList,downPageList:newData1.downPageList };
}

