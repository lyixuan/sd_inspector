import { message } from 'antd';
import { saveUserDemand } from './service';
import { msgF } from '@/utils/utils';

export default {
  namespace: 'cubePlanDia',

  state: {
    saveUserDemandData: null,
  },

  effects: {
    *saveUserDemand({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(saveUserDemand, params);
      const saveUserDemandData = result.data || null;
      if (result.code === 20000) {
        yield put({ type: 'save', payload: { saveUserDemandData } });
        return result.code;
      } else {
        message.error(msgF(result.msg, result.msgDetail));
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
