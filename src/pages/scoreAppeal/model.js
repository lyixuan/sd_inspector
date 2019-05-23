import { message } from 'antd';
import {
  getOrgMapList,
} from '@/pages/qualityAppeal/services';
import { msgF } from '@/utils/utils';

export default {
  namespace: 'scoreAppealModel',

  state: {
  },

  effects: {
    *getOrgMapList({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(getOrgMapList, params);
      const orgList = result.data || [];

      if (result.code === 20000) {
        yield put({ type: 'saveMap', payload: { orgList } });
      } else {
        message.error(msgF(result.msg,result.msgDetail));
      }
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },

  subscriptions: {},
};
