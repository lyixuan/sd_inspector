import {
  getContrastIncomeKpiPkList,
  getIncomeKpiPkList,
  getCountCurrentQuality,
  getCountAppealRecord,
  groupList,
  groupPkList,
  getKpiInfo,
} from './services';
import { fillDataSource } from '@/pages/indexPage/components/utils/utils';
import { message } from 'antd/lib/index';
import { msgF } from "@/utils/utils";
import moment from 'moment';

export default {
  namespace: 'xdClsssModal',
  state: {
    userInfo: {}, // 全局值
    groupList: null,
    kpiTimes: {}, // 时间
    classQualityList: [],
    classAppealList: [],
    familyScorePk: {}, // 本期学分
    groupIncomePk: { // 本期创收
      maxValue: {},
      pkList: []
    }
  },

  effects: {
    // 本期创收
    *getContrastIncomeKpiPkList({ payload, callback }, { call, put }) {
      const params = payload.params;
      const result = yield call(getContrastIncomeKpiPkList, params);
      if (result.code === 20000) {
        if (callback && typeof callback === 'function') {
          callback(result.data);
        }
        yield put({ type: 'save', payload: { groupIncomePk: result.data } });
      } else if (result.code === 50000) {
        if (callback && typeof callback === 'function') {
          callback();
        }
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    *getIncomeKpiPkList({ payload, callback }, { call }) {
      const params = payload.params;
      const result = yield call(getIncomeKpiPkList, params);
      if (result.code === 20000) {
        if (callback && typeof callback === 'function') {
          callback(result.data);
        }
      } else if (result.code === 50000) {
        if (callback && typeof callback === 'function') {
          callback();
        }
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },

    // 本期质检
    *getCountCurrentQuality({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(getCountCurrentQuality, params);
      if (result.code === 20000) {
        yield put({ type: 'save', payload: { classQualityList: result.data } });
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    // 我的申诉
    *getCountAppealRecord({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(getCountAppealRecord, params);
      if (result.code === 20000) {
        yield put({ type: 'save', payload: { classAppealList: result.data } });
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    // 获取右侧的列表数据
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
    //  获取左侧的列表数据
    *groupPkList({ payload, callback }, { call, put }) {
      const params = payload.params;
      const result = yield call(groupPkList, params)
      if (result.code === 20000) {
        if (callback && typeof callback === 'function') {
          callback(result.data);
        }
        yield put({ type: 'saveScore', payload: { data: result.data, key: 'familyScorePk'} });
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    *getKpiInfo({ callback }, { call, put }) {
      const result = yield call(getKpiInfo, {})
      if (result.code === 20000) {
        const params = {
          startTime: moment(result.data.kpiStartDate).format('YYYY-MM-DD'),
          endTime: moment(result.data.kpiEndDate).format('YYYY-MM-DD')
        }
        yield put({ type: 'save', payload: { kpiTimes: params } });
        if (callback && typeof callback === 'function') {
          callback(result.data);
        }
      } else if (result && result.code !== 50000) {
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
    saveScore(state, { payload }) {
      const data = payload.data;
      data.dimensionList = fillDataSource({
        ...state.kpiTimes,
        datatrace: '家族长工作台/本期学分/'
      }, data.dimensionList)
      return { ...state, [payload.key]: data};
    }
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
        const o1 = { title: v1.name, value: `b-${v1.id}`, key: v1.id + 1000, selectable: false, lv: 2 };
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
