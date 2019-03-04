import { getExamList } from '@/services/api';
import { message } from 'antd/lib/index';

export default {
  namespace: 'global',

  state: {
    examList: []
  },

  effects: {
    // 获取考期列表
    *getExamList({ payload }, { call, put }) {
      const data = yield call(getExamList, payload);
      if (data && data.code === 2000) {
        yield put({ type: 'save', payload: { data } });
      } else {
        message.error(data.msg);
      }
    }
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

  subscriptions: {
  },
};
