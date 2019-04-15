import { message } from 'antd';

export default {
  namespace: 'behaviorPath',

  state: {},

  effects: {

  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    }
  },

  subscriptions: {},
};
