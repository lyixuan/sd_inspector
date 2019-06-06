import { message } from 'antd/lib/index';
import { msgF } from '@/utils/utils';
import { startFirstAppeal } from '@/pages/scoreAppeal/appeal_create/services';

export default {
  namespace: 'awaitAppealCreateModel',

  state: {
  },

  effects: {
    // 首次一次申诉
    *firstStartAppeal({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(startFirstAppeal, params);
      if (result.code === 20000) {
        message.success('申诉成功')
      } else {
        message.error(msgF(result.msg,result.msgDetail));
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

