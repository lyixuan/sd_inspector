import { message } from 'antd/lib/index';
import { getQualityList } from '@/pages/qualityAppeal/qualityNewSheet/services';

export default {
  namespace: 'qualityNewSheet',

  state: {
    qualityList:[]
  },

  effects: {
    *getQualityList({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(getQualityList, params);
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
