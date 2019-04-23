import { getDateList, imAct } from './services';
import { message } from 'antd/lib/index';
import { msgF } from '@/utils/utils';

export default {
  namespace: 'behaviorPath',

  state: {
    dateList: [],
    imData: [],
  },

  effects: {
    *getDateList({ payload }, { call, put }) {
      const data = yield call(getDateList, {});
      const dateFormat = data.data[0].replace(/[\u4e00-\u9fa5]/g, "-").split("-");
      dateFormat.length = 3;
      const imData = yield call(imAct, { beginDate: dateFormat.join("-"), stuid: payload.stuId });

      if (data.code === 20000 && imData.code === 20000) {
        yield put({ type: 'save', payload: { dateList: data.data, imData: imData.data } });
      } else {
        message.error(msgF(data.msg, data.msgDetail));
      }
    },
    *imAct({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(imAct, params);
      console.log(26, result);
      if (result.code === 20000) {
        const imData = result.data || [];
        yield put({ type: 'save', payload: { imData } });
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
