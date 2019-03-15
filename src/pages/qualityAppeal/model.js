import { message } from 'antd/lib/index';
import { getOrgMapList } from '@/pages/qualityAppeal/services';

export default {
  namespace: 'qualityAppealHome',

  state: {
    orgList:[]
  },

  effects: {
    *getOrgMapList({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(getOrgMapList, params);
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
