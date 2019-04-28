import { CLICK_KO_ITEM } from '@/utils/constants';
import { DeepCopy } from '@/utils/utils';

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

  return Object.assign({
    pageKeyList,
    actionKeyList,
    currentActionList: newCurrentActionList,
    currentActionKeyId,
    recordTimeList,
    belongApp,
  }, formParams);
}

export function dealResultData({ data1, data2, params }) {
  /*
  * 桑吉接口组合，处理数据
  * data1：桑吉图结构
  * data2：桑吉图值
  * */
  const { page: currentPage } = params;
  const { upPageList: srcUpPageList, downPageList: srcDownPageList } = data1;
  const { pageEventData, actionEventData } = data2;

  const currentPageClickNum = currentPageClickSun(srcUpPageList, pageEventData, currentPage);

  // 处理上游数据
  let upPageList = upDataDeal(srcUpPageList);
  upPageList = upDataAddValue(upPageList, pageEventData, currentPageClickNum);
  upPageList = updataTen(upPageList);
  const upPage = getUpSanKeyMap(upPageList, currentPage, currentPageClickNum);

  // 处理下游数据
  let downPageList = cleanSrcData(srcDownPageList, currentPage);
  downPageList = downDataDeal(downPageList);
  console.log(0,downPageList)
  downPageList = cleanSrcData2(downPageList,currentPage);
  console.log(1,downPageList)
  downPageList = downDataAddValue(downPageList, pageEventData, actionEventData);
  console.log(3,downPageList)
  const currentPageObj = getCurrentPage(downPageList, currentPage);   // 在处理数据前，取出当前页面，即热力图需要的数据
  console.log(4,downPageList)
  downPageList = downDataDealValue(downPageList, pageEventData, actionEventData);  // 继续处理下游数据
  console.log(5,downPageList)
  const downPage = getDownSanKeyMap(downDataTen(downPageList), currentPageObj, currentPage);

  console.log(downPage)
  return {
    upPage,
    downPage,
    currentPageObj,
    currentPage,
  };
}

function stringTool(str) {
  // 获取string最后一个下划线后的数字
  const num = str.lastIndexOf('_');
  return Number(str.substr(num + 1));
}

function currentPageClickSun(upPageList, pageEventData, currentPage) {
  let currentPageClickNum = 0;
  const downPageKeyList = new Set();
  upPageList.forEach((v) => {
    if (v.downPage === currentPage) {
      downPageKeyList.add(v.downPageKey);
    }
  });
  downPageKeyList.forEach((v1) => {
    pageEventData.forEach((v2) => {
      if (v1 === v2.pageKey) currentPageClickNum += v2.clickNum;
    });
  });
  return currentPageClickNum;
}

//
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

function upDataDeal(data) {
  /**
   * 处理(桑吉图结构)上游数据
   * 原始结构：
   * [{page:'',pageKey:'',actionKeyId:'',actionKey:'',downPage:'',downPageName:'',actionName:''}]
   * 关系：page --1:n pageKey
   *
   * 输出结构：
   * [{page:'',pageKeys:[],downPage:'',downPageName:'',clickNum:'',pageView:'',clickNumPro:''}]
   *
   * 关系：page --1:1--  pageKeys
   * */

  const tempObj = {};
  const newList = [];
  // 合并pageKey到page
  data.forEach((v) => {
    if (!tempObj[v.page]) {
      v.pageKeys = new Set([v.pageKey]);
      tempObj[v.page] = v;
    } else {
      tempObj[v.page].pageKeys.add(v.pageKey);
    }
  });
  // 对象转数组
  Object.keys(tempObj).forEach((key) => {
    delete tempObj[key].actionKey;
    delete tempObj[key].actionName;
    delete tempObj[key].children;
    delete tempObj[key].pageKey;
    delete tempObj[key].actionKeyId;
    tempObj[key].pageKeys = Array.from(tempObj[key].pageKeys);
    newList.push(tempObj[key]);
  });

  return newList;
}

function upDataAddValue(upPageList, pageEventData, currentClickNum) {
  /**
   * 1、为 pageList (桑吉图结构)对象添加 页面点击量（pageView）字段
   * 2、为 pageList (桑吉图结构)对象添加 点击人数-流量（clickNum）字段
   * 3、为 pageList (桑吉图结构)对象添加 点击次数占比（clickNumPro）字段
   * */

  const pageList = DeepCopy(upPageList);
  pageList.forEach((v) => {
    v.pageView = 0;
    v.clickNum = 0;
    v.pageKeys.forEach((v1) => {
      pageEventData.forEach((p1) => {
        if (v1 === p1.pageKey) {
          v.pageView += Number(p1.clickNum);
          v.clickNum += Number(p1.clickNum);
        }
      });
    });
  });
  pageList.forEach((v) => {
    v.zb = (v.clickNum / currentClickNum * 100).toFixed(2) + '%';
  });
  return pageList;
}

function updataTen(upPageList) {
  // 上游前十
  let pageList = DeepCopy(upPageList);
  pageList.sort(function(a, b) {
    if (Number(a.clickNum) > Number(b.clickNum)) {
      return -1;
    } else if (a < b) {
      return 1;
    } else {
      return 0;
    }
  });
  pageList = pageList.slice(0, 10);
  return pageList;
}

function getUpSanKeyMap(upPageList, currentPage, currentClickNum) {
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
  upPage.node.push({ id: currentPage, name: '上游页面', pageView: currentClickNum });
  upPageList.forEach((v) => {
    if (v.clickNum || v.clickNum !== 0) { // 只保留非零节点
      upPage.node.push({ id: v.page, name: v.pageName, pageView: v.pageView });
      upPage.links.push({
        source: v.page,
        target: currentPage,
        zb: v.zb || 0,
        value: v.clickNum || 0,
      });
    }
  });

  return upPage;
}

//
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

function downDataDeal(data1) {
  /**
   * 处理(桑吉图结构)下游数据
   *
   * 原始结构：
   * [{page:'',pageKey:'',actionKeyId:'',actionKey:'',downPage:'',downPageName:'',actionName:''}]
   * 关系：page --1:n-- actionKeyId   page --1:n pageKey
   *
   * 输出结构：
   * [{page:'',pageKeys:[],actionKeyIds:
   *     [
   *      {actionKeyId:'',actionKey:'',actionName:'',clickNum:'',clickPeople:'',clickNumPro:'',clickNumPro:'',clickPeoplePro:'',downPage:'',downPageName:'',downPageView:''}
   *    ],
   *  pageView:'',
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
      downPageView: 0,
      clickNum: 0,
      clickPeople: 0,
      clickNumPro: 0,
      clickPeoplePro: 0,
    };
    v.pageView = 0;
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
    // actionKeyId 去重
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
    tempObj[key].pageKeys = Array.from(tempObj[key].pageKeys);
    newList.push(tempObj[key]);
  });
  return newList;
}

function cleanSrcData2(downPageList,currentPage) {
  // 去掉page不在currentPage的downPageList的节点。即独立于currentPage之外的根节点
  // 当前页的target节点list
  const currentPageTargetList = getCurrentPage(downPageList, currentPage).actionKeyIds;

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
  return downPageList;
}

function downDataAddValue(pageList, pageEventData, actionEventData) {
  /**
   * 1、为 桑吉图结构 对象添加 页面点击量（pageView）字段
   * 2、为 桑吉图结构 对象添加 点击人数（clickPeople）字段
   * 3、为 桑吉图结构 对象添加 点击次数（clickNum）字段
   * 4、为 桑吉图结构 对象添加 人数占比（clickPeoplePro）字段
   * 5、为 桑吉图结构 对象添加 次数占比（clickNumPro）字段
   * */
  pageList.forEach((v) => {
    v.pageView = 0;
    v.pagePeopleView = 0;
    v.pageKeys.forEach((v1) => {
      pageEventData.forEach((p1) => {
        if (v1 === p1.pageKey) {
          v.pageView += Number(p1.clickNum);
          v.pagePeopleView += Number(p1.clickPeople);
        }
      });
    });
    v.actionKeyIds.forEach((v2) => {
      v2.clickNum = 0;
      v2.clickPeople = 0;
      actionEventData.forEach((a1) => {
        if (v2.actionKeyId === a1.actionKeyId) {
          v2.clickNum = Number(a1.clickNum);
          v2.clickPeople = Number(a1.clickPeople);
          v2.clickNumPro = v.pageView ? parseFloat(a1.clickNum / v.pageView * 100) : 0; // 点击量占比
          v2.clickPeoplePro = v.pagePeopleView ? parseFloat(a1.clickPeople / v.pagePeopleView * 100) : 0; // 人数击量占比
        }
      });
    });
  });
  // 为 actionKeyIds 里的downPage添加 downPageView，如果该downPage也是page的话;
  pageList.forEach((v1) => {
    v1.actionKeyIds.forEach((v2) => {
      pageList.forEach((v3) => {
        if (v2.downPage === v3.page) {
          v2.downPageView = v3.pageView;
        }
      })
    });
  });
  return pageList;
}

function downDataDealValue(pageList) {
  // 桑吉图，处理actionKeyIds中，最后节点小于0的数据(页面)。这些数据，downPage相同的进行合并，值相加
  pageList.forEach((v1) => {
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
  return pageList;
}

function downDataTen(pageList) {
  /**
   * actionKeyId取前十
   * */
  pageList.forEach((item) => {
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

function getDownSanKeyMap(downPageList, currentPageObj, currentPage) {
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
  const xuankeNode = 'xuankeNode';

  // 下游桑吉图
  downPageList.forEach((v) => {
    if (v.page === currentPage) {
      downPage.node.push({ id: currentPage, name: '下游页面', pageView: v.pageView });
    } else {
      downPage.node.push({ id: v.page, name: v.pageName, pageView: v.pageView });
    }
    v.actionKeyIds.forEach((actionItem) => {
      const num = stringTool(actionItem.actionKeyId);
      if (num > 0) { // 详情页，取actionKeyId
        downPage.node.push({ id: actionItem.actionKeyId, name: actionItem.actionName, pageView: actionItem.clickNum });
        downPage.links.push({
          source: v.page,
          target: actionItem.actionKeyId,
          zb: actionItem.clickNumPro.toFixed(2) + '%',
          value: actionItem.clickNum || 0,
        });
        // 如果target节点包含 CLICK_KO_ITEM ，则再增加一个target节点到 选课节点的连接
        if (actionItem.actionKeyId.indexOf(CLICK_KO_ITEM) >= 0) {
          downPage.node.push({ id: xuankeNode, name: '选课' });
          downPage.links.push({
            source: actionItem.actionKeyId,
            target: xuankeNode,
            zb: actionItem.clickNumPro.toFixed(2) + '%',
            value: actionItem.clickNum || 0,
          });
        }
      } else {  // 页面
        downPage.node.push({ id: actionItem.downPage, name: actionItem.downPageName, pageView: actionItem.downPageView });
        downPage.links.push({
          source: v.page,
          target: actionItem.downPage,
          zb: actionItem.clickNumPro.toFixed(2) + '%',
          value: actionItem.clickNum || 0,
        });
      }
    });
  });
  // downPage.node去重
  const obj = {};
  downPage.node.forEach((v) => {
    if (!obj[v.id]) obj[v.id] = v;
  });
  downPage.node = [];
  Object.keys(obj).forEach((v) => {
    downPage.node.push(obj[v]);
  });
  return delZeroData(downPage);
}

function delZeroData(sanKeyData) {
  /*
    下游
  * 去掉值为0的节点
  * 1、遍历node节点，当前节点在links里为target的值为零，删掉此条link数据
  * 2、累计上述该node在link中为target的值，和为零，删掉此条node数据,否则保留
  * */
  const { node = [], links = [] } = sanKeyData;
  for (let j = node.length - 1; j >= 0; j--) {
    let count = -1;
    for (let i = links.length - 1; i >= 0; i--) {
      if (node[j].id === links[i].target) {
        if (count === -1) count = 0;
        if (links[i].value === 0) {
          links.splice(i, 1);
        } else {
          count += links[i].value;
        }
      }
    }
    if (count === 0) {
      node.splice(j, 1);
    }
  }
  return { node, links };
}







// 桑吉图数据结构参考 demo
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
