import {
  getUserInfo,
  getOrgMapList,
  // kpiLevelList,
  // groupList,
  getIncomeCollegeList,
  getQuestionCheckUser,
  postWriteQuestion,
  // queryAppealDataPage,
  // getFamilyType,
  // getCurrentFamilyType,
  // getOrgList,
  getCurrentDateRange,
  getWorkbenchIncome,
  getWorkbenchScore,
  getNpsData,
  getImNegativeData,
  getImPieData,
} from './services';
import { message } from 'antd/lib/index';
import { msgF } from '@/utils/utils';
import moment from 'moment';

export default {
  namespace: 'xdWorkModal',
  state: {
    userInfo: {}, // 全局值
    orgList: [],
    // globalLevelList: [],
    globalCollegeList: [],
    globalQVisible: false, // 问卷调查是否显示
    getCurrentDateRangeData: null,
    WorkbenchScore: {},
    WorkbenchIncome: {},
    WorkbenchNpsData: {},
    WorkbenchImNegativeData: {},
    WorkbenchImPieData: {},
  },
  effects: {
    // l
    *getWorkbenchScore({ payload, callback }, { call, put }) {
      const result = yield call(getWorkbenchScore, payload.params);
      if (result.code === 20000 && result.data) {
        yield put({ type: 'save', payload: { WorkbenchScore: result.data } });
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    *getWorkbenchIncome({ payload, callback }, { call, put }) {
      const result = yield call(getWorkbenchIncome, payload.params);
      if (result.code === 20000 && result.data) {
        yield put({ type: 'save', payload: { WorkbenchIncome: result.data } });
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },

    *getUserInfo({ callback }, { call, put }) {
      const result = yield call(getUserInfo);
      if (result.code === 20000 && result.data) {
        yield put({ type: 'save', payload: { userInfo: result.data } });
        if (callback && typeof callback === 'function') {
          callback(result.data);
        }
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    // 本期学分数据
    // *getKpiLevelList(_, { call, put }) {
    //   const result = yield call(kpiLevelList)
    //   if (result.code === 20000) {
    //     const globalLevelList = result.data || {};
    //     yield put({ type: 'save', payload: { globalLevelList } });
    //   } else if (result) {
    //     message.error(msgF(result.msg, result.msgDetail));
    //   }
    // },
    // 学分小组列表
    // *groupList({ payload, callback }, { call, put }) {
    //   const params = payload.params;
    //   const result = yield call(groupList, params)
    //   if (result.code === 20000) {
    //     if (callback && typeof callback === 'function') {
    //       callback(result.data);
    //     }
    //   } else if (result) {
    //     message.error(msgF(result.msg, result.msgDetail));
    //   }
    // },
    // 组织列表
    *getOrgMapList({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(getOrgMapList, params);
      const orgList = result.data || [];
      if (result.code === 20000) {
        yield put({ type: 'saveMap', payload: { orgList } });
      } else {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    // 家族-学院列表
    *getIncomeCollegeList(_, { call, put }) {
      const result = yield call(getIncomeCollegeList);
      if (result.code === 20000) {
        yield put({ type: 'save', payload: { globalCollegeList: result.data } });
      } else if (result && result.code !== 50000) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    // 问卷调查获取
    *getQuestionCheckUser({ callback }, { call, put }) {
      const result = yield call(getQuestionCheckUser);
      if (result.code === 20000) {
        if (callback && typeof callback === 'function') {
          callback(result.data);
        }
        yield put({ type: 'save', payload: { globalQVisible: result.data } });
      }
    },
    // 问卷调查提交
    *postWriteQuestion({ payload, callback }, { call, put }) {
      const params = payload.params;
      yield put({ type: 'save', payload: { globalQVisible: false } });
      const result = yield call(postWriteQuestion, params);
      if (result.code === 20000) {
        if (callback && typeof callback === 'function') {
          callback();
        }
        if (!params.refuseFlag) {
          message.success('提交成功！么么哒');
        }
      } else {
        message.success('网络异常，请稍后重试');
      }
    },
    // 柱状图
    //  家族学分对比柱状图部分的接口
    // *queryAppealDataPage({ payload, callback }, { call, put }) {
    //   const result = yield call(queryAppealDataPage, payload.params);
    //   if (result.code === 20000 && result.data) {
    //     if (callback && typeof callback === 'function') {
    //       callback(result.data);
    //     }
    //   } else if (result) {
    //     message.error(msgF(result.msg, result.msgDetail));
    //   }
    // },
    // 自考壁垒接口
    // *getFamilyType({ payload, callback }, { call, put }) {
    //   const result = yield call(getFamilyType);
    //   if (result.code === 20000 && result.data) {
    //     if (callback && typeof callback === 'function') {
    //       callback(result.data);
    //     }
    //   } else if (result) {
    //     message.error(msgF(result.msg, result.msgDetail));
    //   }
    // },
    // // 获取用户familyType
    // *getCurrentFamilyType({ payload, callback }, { call, put }) {
    //   const result = yield call(getCurrentFamilyType);
    //   if (result.code === 20000 && result.data) {
    //     if (callback && typeof callback === 'function') {
    //       callback(result.data);
    //     }
    //   } else if (result) {
    //     message.error(msgF(result.msg, result.msgDetail));
    //   }
    // },
    // // 自考壁垒对应学院
    // *getOrgList({ payload, callback }, { call, put }) {
    //   const result = yield call(getOrgList, payload.params);
    //   if (result.code === 20000 && result.data) {
    //     yield put({ type: 'saveOrg', payload: { listObj: result.data } });
    //   } else if (result) {
    //     message.error(msgF(result.msg, result.msgDetail));
    //   }
    // },

    // 获取绩效周期
    *getCurrentDateRange({ payload, callback }, { call, put }) {
      const params = payload.params;
      const result = yield call(getCurrentDateRange, params);
      if (result.code === 20000) {
        yield put({
          type: 'save',
          payload: {
            getCurrentDateRangeData: {
              startTime: moment(result.data.startDate).format('YYYY-MM-DD'),
              endTime: moment(result.data.endDate).format('YYYY-MM-DD'),
            },
          },
        });
        return result.data;
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },

    // 获取Nps数据
    *getNpsData({ payload, callback }, { call, put }) {
      const result = yield call(getNpsData, payload.params);
      if (result.code === 20000 && result.data) {
        yield put({ type: 'save', payload: { WorkbenchNpsData: result.data } });
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },

    // 获取im负面数据
    *getImNegativeData({ payload, callback }, { call, put }) {
      const result = yield call(getImNegativeData, payload.params);
      if (result.code === 20000 && result.data) {
        yield put({ type: 'save', payload: { WorkbenchImNegativeData: result.data } });
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },

    // 获取im负面数据
    *getImPieData({ payload, callback }, { call, put }) {
      const result = yield call(getImPieData, payload.params);
      if (result.code === 20000 && result.data) {
        yield put({ type: 'save', payload: { WorkbenchImPieData: result.data } });
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
    saveMap(state, { payload }) {
      const orgListTreeData = toTreeData(payload.orgList);
      return { ...state, orgList: payload.orgList, orgListTreeData };
    },
    saveOrg(state, { payload }) {
      const globalOrgList = {
        0: getNullNodeList(payload.listObj[0]),
        1: getNullNodeList(payload.listObj[1]),
      };
      return { ...state, globalOrgList };
    },
  },
  subscriptions: {},
};
function toTreeData(orgList) {
  const treeData = [];
  orgList.forEach(v => {
    const o = { title: v.name, value: `a-${v.id}`, key: v.id, selectable: false, lv: 1 };
    if (v.nodeList.length > 0) {
      o.children = [];
      v.nodeList.forEach(v1 => {
        const o1 = {
          title: v1.name,
          value: `b-${v1.id}`,
          key: v1.id + 1000,
          selectable: false,
          lv: 2,
        };
        o.children.push(o1);
        if (v1.nodeList.length > 0) {
          o1.children = [];
          v1.nodeList.forEach(v2 => {
            const o2 = { title: v2.name, value: `c-${v2.id}`, key: v2.id + 100000, lv: 3 };
            o1.children.push(o2);
          });
        }
      });
    }
    treeData.push(o);
  });
  return treeData;
}
function getNullNodeList(data = []) {
  data.map(item => {
    if (item.nodeList instanceof Array) {
      const l = item.nodeList.length;
      if (l === 0) {
        item.nodeList = null;
      } else if (l > 0) {
        getNullNodeList(item.nodeList);
      }
    }
  });
  return data;
}
