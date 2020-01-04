import {
  getOrgList,
  dialoguDataList,
  getDayData,
  getDialogAndEvaluateData
} from './services';

import { message } from 'antd/lib/index';
import { msgF } from "@/utils/utils";

export default {
  namespace: 'robotPage',
  state: {
    globalOrgList: {},
    dialoguDataList: [],
    dayData: [],
    pieData: {},
    dataIsEmpty: {
      interceptArr: [],
      parse1: [],
      parse2: [],
      parse3: [],
      parse4: []
    },
    initData: {}
  },
  effects: {
    *updateRouteData({ payload }, { call, put }) {
      yield put({
        type: 'save',
        payload: { initData: payload.params },
      })
    },
    // 自考壁垒对应学院
    *getOrgList({ payload, callback }, { call, put }) {
      const result = yield call(getOrgList);
      if (result.code === 20000 && result.data) {
        yield put({ type: 'saveOrg', payload: { listObj: result.data } });
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    *dialoguDataList({ payload, callback }, { call, put }) {
      const result = yield call(dialoguDataList, payload.params);
      if (result.code === 20000 && result.data) {
        yield put({ type: 'save', payload: { dialoguDataList: result.data } });
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    *getDayData({ payload, callback }, { call, put }) {
      const result = yield call(getDayData, payload.params);
      if (result.code === 20000 && result.data) {
        yield put({ type: 'saveDayData', payload: { dayData: result.data } });
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    *getDialogAndEvaluateData({ payload, callback }, { call, put }) {
      const result = yield call(getDialogAndEvaluateData, payload.params);
      if (result.code === 20000 && result.data) {
        yield put({ type: 'save', payload: { pieData: result.data } });
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
    saveOrg(state, { payload }) {
      const globalOrgList = {
        0: getNullNodeList(payload.listObj),
        1: getNullNodeList(payload.listObj),
      };
      return { ...state, globalOrgList };
    },
    saveDayData(state, { payload }) {
      const list = payload.dayData;
      let arr = {
        interceptArr: [],
        parse1: [],
        parse2: [],
        parse3: [],
        parse4: []
      }
      list.map(item => {
        arr.interceptArr.push(item.interceptPercent);
        arr.parse1.push(item.badPercent);
        arr.parse2.push(item.commonPercent);
        arr.parse3.push(item.goodPercent);
        arr.parse4.push(item.veryGoodPercent);
      })
      return { ...state, ...payload, dataIsEmpty: arr };
    }

  }
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
