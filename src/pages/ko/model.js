import { message } from 'antd';

export default {
  namespace: 'koPlan',

  state: {
    params: {},
  },

  effects: {

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
