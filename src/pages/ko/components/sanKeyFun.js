import { CLICK_KO_ITEM } from '@/utils/constants';

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
   *      {actionKeyId:'',actionKey:'',actionName:'',clickNum:'',clickPeople:'',clickNumPro:'',clickNumPro:'',clickPeoplePro:'',downPage:'',downPageName:''}
   *    ],
   *  pv:'',
   * }]
   *
   * 关系：page --1:1-- actionKeyIds --1:1-- pageKeys
   * */

  // 合并多个pageKey和多个actionKeyId并去重
  const tempObj = {};
  const newList = [];
  data1.forEach((v) => {
    const actionObj = {
      actionKeyId: v.actionKeyId,
      actionKey: v.actionKey,
      actionName: v.actionName,
      downPage: v.downPage,
      downPageName: v.downPageName,
    };
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
    Object.keys(tempO).forEach((key2) => {
      tempObj[key].actionKeyIds.push(tempO[key2]);
    });
    delete tempObj[key].actionKey;
    delete tempObj[key].actionName;
    delete tempObj[key].children;
    delete tempObj[key].pageKey;
    delete tempObj[key].actionKeyId;
    delete tempObj[key].downPage;
    delete tempObj[key].downPageName;
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
    v.pv = 0;
    v.pClickPeople = 0;
    v.pageKeys.forEach((v1) => {
      pageEventData.forEach((p1) => {
        if (v1 === p1.pageKey) {
          v.pv += Number(p1.clickNum);               // pv：pageKey 的点击量之和,
          v.pClickPeople += Number(p1.clickPeople);  // pClickPeople页面点击人数
        }
      });
    });
    v.actionKeyIds.forEach((v2) => {
      v2.clickNum = 0;
      v2.clickPeople = 0;
      actionEventData.forEach((a1) => {
        if (v2.actionKeyId === a1.actionKeyId) {
          v2.clickNum = Number(a1.clickNum);       // clickNum：热点点击量 即actionKeyId 的点击量
          v2.clickPeople = Number(a1.clickPeople); // clickPeople：热点点击人数为 actionKeyId 的点击人数

          v2.clickNumPro = v.pv ? parseFloat(a1.clickNum / v.pv * 100) : 0; // 点击量占比
          v2.clickPeoplePro = v.pClickPeople ? parseFloat(a1.clickPeople / v.pClickPeople * 100) : 0; // 人数击量占比
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
  pageList.forEach((item) => {
    // actionKeyId 排序，倒叙
    item.actionKeyIds.sort(function (a, b) {
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
  return Number(str.substr(num + 1));
}

function cleanSrcData(srcList, currentPage) {
  // 去掉downPage==currentPage的数据
  const newSrcList = [];
  srcList.forEach((v) => {
    if (v.downPage !== currentPage) {
      newSrcList.push(v);
    }
  });
  return newSrcList;
}

function actionListDataDeal(downPageList) {
  // 桑吉图，处理actionKeyIds中，最后节点小于0的数据。这些数据，downPage相同的进行合并，值相加；只处理下游节点
  downPageList.forEach((v1) => {
    const tempObject = {};
    const tempList = [];
    v1.actionKeyIds.forEach((v2) => {
      if (stringTool(v2.actionKeyId) < 0) {
        if (!tempObject[v2.downPage]) {
          tempObject[v2.downPage] = v2;
        } else {
          tempObject[v2.downPage].clickNum += Number(v2.clickNum);
          tempObject[v2.downPage].clickNumPro += parseFloat(v2.clickNumPro);
          tempObject[v2.downPage].clickPeople += Number(v2.clickPeople);
          tempObject[v2.downPage].clickPeoplePro += parseFloat(v2.clickPeoplePro);
        }
      }
    });
    Object.keys(tempObject).forEach((key) => {
      tempList.push(tempObject[key]);
    });
    v1.actionKeyIds = tempList;
  });
  return downPageList;
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
    if (v.page !== currentPage) {
      upPage.node.push({ id: v.page, name: v.pageName, pageView: v.pv });
    }
    upPage.links.push({
      source: v.page,
      target: currentPage,
      // pv: v.pv || 0,
      value: v.pv || 0,
    });
    total += v.pv;
  });

  upPage.links.forEach((v) => {
    v.zb = (v.pv / total * 100).toFixed(2) + '%';
  });
  return upPage
}

function getDownSanKeyMap(downPageList, currentPageObj, currentPage) {
  /**
   * 构造桑吉图要的数据结构，并处理特殊节点
   *
   * 下游桑吉图规则：
   *  0、先去除非当前页面的根节点
   *  1、节点和连线的id和name取值规则：
   *     actionKeyId值下划线最后一个值大于零，认为是详情页；所有详情页取 actionkeyId 作为node节点的 id。其它取page作为id。name同理
   *  2、是否流向 选课 节点规则：
   *     通过判断KO_LIST_ACTION改值是否存在于actionKeyId里确实这个节点是否流向 选课 节点。包含则流向选课节点
   * */
  const downPage = {
    node: [],
    links: [],
  };

  const xuankeNode = 'xuankeNode';

  // 当前页的target节点list
  const currentPageTargetList = currentPageObj.actionKeyIds;

  for (let i = downPageList.length - 1; i >= 0; i--) {
    if (downPageList[i].page !== currentPage) {
      let flag = 0; // 1 改page存在于currentPageTargetList 0 不存在，这种节点要去除
      currentPageTargetList.forEach((v) => {
        if (downPageList[i].page === v.downPage) {
          flag = 1;
        }
      });
      if (!flag) {
        downPageList.splice(i, 1)
      }
    }
  }

  console.log('downPageList 桑吉结构前', downPageList)

  // 下游桑吉图
  downPage.node.push({ id: currentPage, name: '下游页面' });

  downPageList.forEach((v) => {
    if (v.page !== currentPage) {
      downPage.node.push({ id: v.page, name: v.pageName, pageView: v.pv });
    }
    v.actionKeyIds.forEach((actionItem) => {
      const num = stringTool(actionItem.actionKeyId);
      if (num > 0) {
        downPage.node.push({ id: actionItem.actionKeyId, name: actionItem.actionName, pageView: actionItem.clickNum });
        downPage.links.push({
          source: v.page,
          target: actionItem.actionKeyId,
          // pv: v.pv || 0,
          zb: actionItem.clickNumPro.toFixed(2) + '%',
          value: actionItem.clickNum || 0,
        });
        // 如果target节点包含 CLICK_KO_ITEM ，则再增加一个target节点到 选课节点的连接
        if (actionItem.actionKeyId.indexOf(CLICK_KO_ITEM) >= 0) {
          downPage.node.push({ id: xuankeNode, name: '选课' });
          downPage.links.push({
            source: actionItem.actionKeyId,
            target: xuankeNode,
            // pv: actionItem.clickNum || 0,
            zb: actionItem.clickNumPro.toFixed(2) + '%',
            value: actionItem.clickNum || 0,
          });
        }
      } else {
        downPage.node.push({ id: actionItem.downPage, name: actionItem.downPageName, pageView: actionItem.clickNum });
        downPage.links.push({
          source: v.page,
          target: actionItem.downPage,
          // pv: v.pv || 0,
          zb: actionItem.clickNumPro.toFixed(2) + '%',
          value: actionItem.clickNum || 0,
        });
      }
    });
  });
  // downPage.node去重
  const obj = {};
  downPage.node.forEach((v) => {
    if (!obj[v.id]) {
      obj[v.id] = v;
    }
  });
  downPage.node = [];
  Object.keys(obj).forEach((v) => {
    downPage.node.push(obj[v]);
  });
  console.log('downPageList 桑吉结构 后--', downPage)
  return downPage;
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
  currentActionList.forEach((v) => {
    if (!tempObj[v.actionKeyId]) {
      tempObj[v.actionKeyId] = v;
    }
  });
  let newCurrentActionList = [];
  Object.keys(tempObj).forEach((key) => {
    newCurrentActionList.push(tempObj[key]);
  });

  return Object.assign({ pageKeyList, actionKeyList, currentActionList: newCurrentActionList, currentActionKeyId, recordTimeList, belongApp }, formParams);
}

export function dealResultData({ data1, data2, params }) {
  /*
  * 桑吉接口组合，处理数据
  * */
  const { page: currentPage } = params;

  // 清洗数据 只需处理下游
  const cleanedDownPageList = cleanSrcData(data1.downPageList, currentPage);

  // 基于page合并去重，构造新的数据结构
  let upPageList = dealData1(data1.upPageList);
  let downPageList = dealData1(cleanedDownPageList);

  // 结构和数值匹配。为newData1添加 页面点击量 点击人数等数值
  upPageList = addObjectItem(upPageList, data2.pageEventData, data2.actionEventData);
  downPageList = addObjectItem(downPageList, data2.pageEventData, data2.actionEventData);

  // 热力图，筛选当前页面
  const currentPageObj = getCurrentPage(downPageList, currentPage);

  // 桑吉图，处理actionKeyIds中，最后节点小于0的数据。这些数据，downPage相同的进行合并，值相加；只处理下游节点
  const dealledDownPageList = actionListDataDeal(downPageList);

  // 构造桑吉图需要的结构，并处理节点。actionKeyId点击量取前十
  const upPage = getUpSanKeyMap(getFirstTen(upPageList), currentPage);
  const downPage = getDownSanKeyMap(getFirstTen(dealledDownPageList), currentPageObj, currentPage);

  return {
    upPage,
    downPage,
    currentPageObj,
    currentPage
  };
}

