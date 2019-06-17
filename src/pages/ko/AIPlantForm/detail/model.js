import { message } from 'antd/lib/index';
import { msgF } from '@/utils/utils';
import {
  getConsultTypeTree,
  getReasonTypeTree
} from './services';

export default {
  namespace: 'AiDetail',

  state: {
    consultTypeTree: null,
    reasonTypeTree: null
  },

  effects: {
    *getConsultTypeTree({ payload }, { call, put }) {
      const result = yield call(getConsultTypeTree, {});
      if (result.code === 20000) {
        const consultTypeTree = result.data || [];
        yield put({ type: 'save', payload: { consultTypeTree } });
      } else {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    *getReasonTypeTree({ payload }, { call, put }) {
      const result = yield call(getReasonTypeTree, {});
      console.log(16, result)
      if (result.code === 20000) {
        const reasonTypeTree = result.data || [];
        yield put({ type: 'save', payload: { reasonTypeTree } });
      } else {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },

  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

  subscriptions: {},
};
