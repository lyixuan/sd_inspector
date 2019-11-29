
import {
  getUserInfo,
  getOrgMapList,
  // kpiLevelList,
  groupList,
  getIncomeCollegeList,
  getQuestionCheckUser, 
  postWriteQuestion
} from './services';
import { message } from 'antd/lib/index';
import { msgF } from '@/utils/utils';

export default {
  namespace: 'xdWorkModal',
  state: {
    userInfo: {}, // 全局值
    orgList:[],
    // globalLevelList: [],
    globalCollegeList: [],
    globalQVisible: false, // 问卷调查是否显示
  },
  effects: {
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
    *groupList({ payload, callback }, { call, put }) {
      const params = payload.params;
      const result = yield call(groupList, params)
      if (result.code === 20000) {
        if (callback && typeof callback === 'function') {
          callback(result.data);
        }
      } else if (result) {
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
        yield put({ type: 'save', payload: { globalQVisible: result.data} });
      }
    },
    // 问卷调查提交
    *postWriteQuestion({ payload, callback }, { call, put }) {
      const params = payload.params;
      yield put({ type: 'save', payload: { globalQVisible: false} });
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
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
    saveMap(state, { payload }) {
      const orgListTreeData = toTreeData(payload.orgList);
      return { ...state, orgList: payload.orgList, orgListTreeData };
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
