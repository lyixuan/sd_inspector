
import { message } from 'antd/lib/index';
import { getAppealList } from '@/pages/qualityAppeal/qualityAppeal/services';

export default {
  namespace: 'qualityCheck',

  state: {
    qualityAppealList:[]
  },

  effects: {
    *getAppealList({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(getAppealList, params);
      const orgList = result.data || [];

      if (result.code === 20000) {
        yield put({ type: 'save', payload: { orgList } });
      } else {
        message.error(result.msgDetail);
      }
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

  subscriptions: {
  },
};
