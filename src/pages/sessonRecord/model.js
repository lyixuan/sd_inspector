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
    sessionList: []
  },
  effects: {
    *getUserOrgList({ payload, callback }, { call, put }) {
      const result = yield call(getUserOrgList);
      if (result.code === 20000) {
        const res = result.data;
        yield put({ type: 'save', payload: { orgList: res } });
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

  }
}
