import { message } from 'antd';
import { getKOEnumList } from './services';

export default {
  namespace: 'koPlan',

  state: {
    params: {},
  },

  effects: {
    *getKOEnumList({ payload }, { call, put }) {
      const response = yield call(getKOEnumList, payload);
      console.log(response)

    }

  },

  reducers: {
    saveParams(state, { payload }) {
      return { ...state, ...payload };
    },
    save(state, { payload }) {
      return { ...state, ...payload };
    }
  },

  subscriptions: {},
};
