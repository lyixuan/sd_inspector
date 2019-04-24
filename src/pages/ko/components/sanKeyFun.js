import { KO_LIST_ACTION } from '@/utils/constants';

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
   * [{page:'',pageKey:'',actionKeyId:'',actionKey:'',downPage:'',downPageName:'',actionName:''}]
   * 关系：page --1:n-- actionKeyId   page --1:n pageKey
   *
   * 输出结构：
   * [{page:'',pageKeys:[],actionKeyIds:
   *     [
   *      {actionKeyId:'',actionKey:'',actionName:'',clickNum:'',clickPeople:'',clickNumPro:'',clickNumPro:'',clickPeoplePro:''}
   *    ],
   *  pv:'',
   *  downPage:'',
   *  downPageName:'',
   * }]
   *
   * 关系：page --1:1-- actionKeyIds --1:1-- pageKeys
   * */

    // 合并多个pageKey和多个actionKeyId并去重
  const tempObj = {};
  const newList = [];
  data1.forEach((v) => {
    const actionObj = { actionKeyId: v.actionKeyId, actionKey: v.actionKey, actionName: v.actionName };
    if (!tempObj[v.page]) {
      v.pageKeys = new Set([v.pageKey]);
      v.actionKeyIds = [actionObj];
      tempObj[v.page] = v;
    } else {
      tempObj[v.page].pageKeys.add(v.pageKey);
      tempObj[v.page].actionKeyIds.push(actionObj);
    }
  });
  Object.keys(tempObj).forEach((key) => {
    tempObj[key].pageKeys = Array.from(tempObj[key].pageKeys);
    const tempO = {};
    tempObj[key].actionKeyIds.forEach((item) => {
      if (!tempO[item.actionKeyId]) {
        tempO[item.actionKeyId] = item;
      }
    });
    tempObj[key].actionKeyIds = [];
    Object.keys(tempO).forEach((key2)=>{
      tempObj[key].actionKeyIds.push(tempO[key2]);
    });
    delete tempObj[key].actionKey;
    delete tempObj[key].actionName;
    delete tempObj[key].children;
    delete tempObj[key].pageKey;
    delete tempObj[key].actionKeyId;
    newList.push(tempObj[key]);
  });
  return newList;
}

function addObjectItem(pageList, pageEventData, actionEventData) {
  /**
   * 1、为 newData1 (桑吉图结构)子对象添加 页面点击量（pv）字段
   * 2、为 newData1 (桑吉图结构)子对象添加 点击人数（clickPeople）字段
   * 3、为 newData1 (桑吉图结构)子对象添加 点击次数（clickNum）字段
   * 4、为 newData1 (桑吉图结构)子对象添加 人数占比（clickPeoplePro）字段
   * 5、为 newData1 (桑吉图结构)子对象添加 次数占比（clickNumPro）字段
   * key可能会不存在
   * return newData1
   * */
  pageList.forEach((v) => {
    v.pageKeys.forEach((v1) => {
      pageEventData.forEach((p1) => {
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
    v.actionKeyIds.forEach((v2) => {
      actionEventData.forEach((a1) => {
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
          v2.clickNumPro = v.pv?(a1.clickNum / v.pv* 100).toFixed(4) + '%':0; //小数点后两位百分比
          // 人数击量占比
          v2.clickPeoplePro = v.pClickPeople?(a1.clickPeople / v.pClickPeople* 100).toFixed(4) + '%':0; //小数点后两位百分比
        }
      });
    });
  });
  return pageList;
}

function getFirstTen(pageList) {
  /**
   * actionKeyId取前十
   * */
  pageList.forEach((item)=>{
    // actionKeyId 排序，倒叙
    item.actionKeyIds.sort(function(a, b) {
      if (Number(a.clickNum) > Number(b.clickNum)) {
        return -1;
      } else if (a < b) {
        return 1;
      } else {
        return 0;
      }
    });
    // 取前十
    item.actionKeyIds = item.actionKeyIds.slice(0, 10);
  });
  return pageList;
}

function getUpSanKeyMap(upPageList, currentPage) {
  /**
   * 构造桑吉图要的数据结构，并处理特殊节点
   *
   * 上游桑吉图规则：
   *    上游桑吉图，节点和连线都取page和downPage
   * */
  const upPage = {
    node: [],
    links: [],
  };

  // 上游桑吉图
  let total = 0;
  upPage.node.push({ id: currentPage, name: '上游页面' });

  upPageList.forEach((v) => {
    upPage.node.push({ id: v.page, name: v.pageName });
    upPage.links.push({
      source: v.page,
      target: v.downPage,
      pv: 1,
      zb: 1,
      value: 1,
    });
    total+=v.pv;
  });

  upPage.links.forEach((v)=>{
    v.zb = (v.pv/total*100).toFixed(2) + '%';
  });

  console.log('upPage',upPage)
  return upPage
}

function getDownSanKeyMap(downPageList, currentPage) {
  /**
   * 构造桑吉图要的数据结构，并处理特殊节点
   *
   * 下游桑吉图规则：
   *  1、节点和连线的id和name取值规则：
   *     actionKeyId值下划线最后一个值大于零，认为是详情页；所有详情页取 actionkeyId 作为node节点的 id。其它取page作为id。name同理
   *  2、是否流向 选课 节点规则：
   *     通过判断KO_LIST_ACTION改值是否存在于actionKeyId里确实这个节点是否流向 选课 节点。包含则流向选课节点
   * */
  const downPage = {
    node: [],
    links: [],
  };

  // 下游桑吉图
  downPage.node.push({ id: currentPage, name: '下游页面' });
  downPageList.forEach((v) => {
    v.actionKeyIds.forEach((actionItem) => {
      const num = stringTool(actionItem.actionKeyId);
      if (num > 0){
        downPage.node.push({ id: actionItem.actionKeyId, name: actionItem.actionName });
        downPage.links.push({
          source: v.page,
          target: actionItem.actionKeyId,
          pv: v.pv || 1,
          zb: actionItem.clickNumPro || '0.00%',
          value: actionItem.clickNum || 1,
        });
      } else {
        downPage.node.push({ id: v.page, name: v.pageName });
        downPage.links.push({
          source: v.page,
          target: v.downPage,
          pv: v.pv || 1,
          zb: actionItem.clickNumPro || '0.00%',
          value: actionItem.clickNum || 1,
        });
      }
    });


  });
  return downPage;
}

function getCurrentPage(downPageList, currentPage) {
  let currentPageObj = {};
  for (let i = 0; i < downPageList.length; i++) {
    if (downPageList[i].page === currentPage) {
      currentPageObj = downPageList[i];
      break;
    }
  }
  return currentPageObj;
}

function stringTool(str) {
  // 获取string最后一个下划线后的数字，并判断是否大于零
  const num = str.lastIndexOf('_');
  return Number(str.substr(num+1));
}

export function dealMapOrg({ data, formParams, params, otherParams }) {
  /*
  * 基于结构数据data，构造下一个接口需要的参数
  * */
  const { page: currentPage, belongApp } = params;
  const { currentActionKeyId, recordTimeList } = otherParams;

  let pageKeyList = new Set();
  let actionKeyList = new Set();
  let currentActionList = [];

  data.upPageList && data.upPageList.forEach((v) => {
    pageKeyList.add(currentPage);
    actionKeyList.add(v.actionKeyId);
  });
  data.downPageList && data.downPageList.forEach((v) => {
    pageKeyList.add(v.pageKey);
    actionKeyList.add(v.actionKeyId);
    if (v.page === currentPage) {
      currentActionList.push({ actionKeyId: v.actionKeyId, actionKey: v.actionKey, actionName: v.actionName });
    }
  });
  pageKeyList = Array.from(pageKeyList);
  actionKeyList = Array.from(actionKeyList);
  const tempObj = {};
  currentActionList.forEach((v)=>{
    if (!tempObj[v.actionKeyId]) {
      tempObj[v.actionKeyId] = v;
    }
  });
  let newCurrentActionList = [];
  Object.keys(tempObj).forEach((key)=>{
    newCurrentActionList.push(tempObj[key]);
  });

  return Object.assign({ pageKeyList, actionKeyList, currentActionList:newCurrentActionList, currentActionKeyId, recordTimeList, belongApp },formParams);
}

export function dealResultData({ data1, data2, params }) {
  /*
  * 桑吉接口组合，处理数据
  * */
  const { page: currentPage } = params;
  let newData1 = {
    upPageList: [],
    downPageList: [],
  };

  // 基于page合并去重
  newData1.upPageList = dealData1(data1.upPageList);
  newData1.downPageList = dealData1(data1.downPageList);

  // 为newData1添加 页面点击量 点击人数等;并取actionKeyId点击量前十
  newData1.upPageList = addObjectItem(newData1.upPageList, data2.pageEventData, data2.actionEventData);
  newData1.downPageList = addObjectItem(newData1.downPageList, data2.pageEventData, data2.actionEventData);

  // 构造桑吉图需要的结构，并处理节点
  const upPage = getUpSanKeyMap(getFirstTen(newData1.upPageList),currentPage);
  const downPage = getDownSanKeyMap(getFirstTen(newData1.downPageList,currentPage));

  // 筛选当前页面
  const currentPageObj = getCurrentPage(newData1.downPageList, currentPage);

  return {
    upPage,
    downPage,
    currentPageObj,
    currentPage,
    upPageList: newData1.upPageList,
    downPageList: newData1.downPageList,
  };
}

