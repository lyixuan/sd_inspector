import {
  getUserOrgList,
  queryPage
} from './services';

import { message } from 'antd/lib/index';
import { msgF } from "@/utils/utils";

export default {
  namespace: 'sessonRecord',
  state: {
    orgList: [],
    sessionList: [],
    orgList: []
  },
  effects: {
    *getUserOrgList({ payload, callback }, { call, put }) {
      const result = yield call(getUserOrgList);
      if (result.code === 20000) {
        const res = result.data;
        yield put({ type: 'saveOrg', payload: { listObj: res } });
        // yield put({ type: 'save', payload: { orgList: res } });
        if (callback && typeof callback === 'function') {
          callback(res);
        }
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    *queryPage({ payload, callback }, { call, put }) {
      const result = yield call(queryPage, payload.params);
      if (result.code === 20000) {
        const res = result.data;
        yield put({ type: 'save', payload: { sessionList: res } });
        if (callback && typeof callback === 'function') {
          callback(res);
        }
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
      const orgList = getNullNodeList(payload.listObj);
      return { ...state, orgList };
    },

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