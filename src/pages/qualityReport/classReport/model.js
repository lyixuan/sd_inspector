import { msgF } from '@/utils/utils';

export default {
  namespace: 'classReport',

  state: {
  },

  effects: {
  },
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

  subscriptions: {
  },
};

