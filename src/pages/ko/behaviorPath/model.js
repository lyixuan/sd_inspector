import { getDateList, imAct } from './services';
import { message } from 'antd/lib/index';
import { msgF } from '@/utils/utils';

export default {
  namespace: 'behaviorPath',

  state: {
    dateList: [],
    listData: []
  },

  effects: {
    *getDateList({ payload }, { call, put }) {
      const data = yield call(getDateList, { ...payload });
      const dates = yield call(imAct, { beginDate: "2019-04-17", stuId: 1767329 });
      console.log(17, dates)
      if (data.code === 20000) {
        yield put({ type: 'save', payload: { dateList: data.data } });
        yield put({ type: 'imAct', payload: { listData: dates.data } });

      } else {
        message.error(msgF(data.msg, data.msgDetail));
      }

    },
    *imAct({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(imAct, params);
      console.log(26, result)
      if (result.code === 20000) {
        const listData = result.data || [];
        yield put({ type: 'save', payload: { listData } });
      } else {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    }
  },

  subscriptions: {},
};
