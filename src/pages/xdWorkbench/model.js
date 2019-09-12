import {
  getContrastIncomeKpiPkList,
  getIncomeKpiPkList,
  getIncomeKpiPersonInfo,
  getCountCurrentQuality,
  getCountAppealRecord,
  kpiLevelList,
  groupList,
  groupPkList
} from './services';
import { message } from 'antd/lib/index';
import {msgF} from "@/utils/utils";

export default {
  namespace: 'xdWorkModal',
  state: {
    kpiLevelList:null,
    groupList:null,
    groupPkList:null
  },

  effects: {
    // 本期创收
    *getContrastIncomeKpiPkList({ payload, callback }, { call }) {
      const params = payload.params;
      const result = yield call(getContrastIncomeKpiPkList, params);
      if (result.code === 20000) {
        if (callback && typeof callback === 'function') {
          callback(result.data);
        }
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    *getIncomeKpiPkList({ payload, callback }, { call }) {
      const params = payload.params;
      const result = yield call(getIncomeKpiPkList, params);
      if (result.code === 20000) {
        console.log(result.data, 'llll')
        if (callback && typeof callback === 'function') {
          callback(result.data);
        }
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    *getIncomeKpiPersonInfo({ payload, callback }, { call }) {
      const params = payload.params;
      const result = yield call(getIncomeKpiPersonInfo, params);
      if (result.code === 20000) {
        if (callback && typeof callback === 'function') {
          callback(result.data);
        }
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },

    // 本期质检
    *getCountCurrentQuality({ payload, callback }, { call }) {
      const params = payload.params;
      const result = yield call(getCountCurrentQuality, params);
      if (result.code === 20000) {
        if (callback && typeof callback === 'function') {
          callback(result.data);
        }
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
     // 我的申诉
    *getCountAppealRecord({ payload, callback }, { call }) {
      const params = payload.params;
      const result = yield call(getCountAppealRecord, params);
      if (result.code === 20000) {
        if (callback && typeof callback === 'function') {
          callback(result.data);
        }
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    // 以下是本期学分相关的接口
    // 本期学分人均在服人员下拉里面的数据
    *kpiLevelList({payload},{call,put}){
      const params = payload.params;
      const result = yield call(kpiLevelList,params)
      if (result.code === 20000) {
        const kpiLevelList = result.data || {};
        yield put({ type: 'save', payload: { kpiLevelList} });
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    // 获取右侧的列表数据
    *groupList({payload},{call,put}){
      const params = payload.params;
      const result = yield call(groupList,params)
      if(result.code === 20000){
        const groupList = result.data || {};
        yield put({type:'save',payload:{groupList}});
      }else if(result){
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
  //  获取左侧的列表数据
    *groupPkList({payload},{call,put}){
      const params = payload.params;
      const result = yield call(groupPkList,params)
      if(result.code === 20000){
        const groupPkList = result.data || {};
        yield put({type:'save',payload:{groupPkList}});
      }else if(result){
        message.error(msgF(result.msg, result.msgDetail));
      }
    }
  //
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  subscriptions: {},
};
