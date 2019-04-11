import { message } from 'antd';

export default {
  namespace: 'behavior',

  state: { },

  effects: {

  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    }
  },

  subscriptions: {},
};
