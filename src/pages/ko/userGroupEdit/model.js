import { userGroupInput, userGroupCheck } from './services';
import { message } from 'antd/lib/index';
import { msgF } from '@/utils/utils';

export default {
  namespace: 'userGroupEdit',

  state: {
    checkResult: null,
    current: 0,
    isLoading: null,
  },

  effects: {
    *userGroupInput({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(userGroupInput, params);
      if (result.code === 20000) {
        const checkResult = result.data;
        yield put({ type: 'save', payload: { checkResult, current: 1, isLoading: false } });
      } else {
        yield put({ type: 'save', payload: { isLoading: false } });
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    *userGroupCheck({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(userGroupCheck, params);
      if (result.code === 20000) {
        yield put({ type: 'save', payload: { current: 2, isLoading: false } });
      } else {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    *editCurrent({ payload }, { put }) {
      const { current } = payload;
      yield put({ type: 'save', payload: { current } });
    },
    *editLoading({ payload }, { put }) {
      const { isLoading } = payload;
      yield put({ type: 'save', payload: { isLoading } });
    },
    *initParams({ payload }, { put }) {
      const { disableDel, nums } = payload;
      yield put({ type: 'save', payload: { disableDel, nums } });
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },

  subscriptions: {},
};
