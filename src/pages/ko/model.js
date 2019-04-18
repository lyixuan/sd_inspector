import { message } from 'antd';
import { msgF } from '@/utils/utils';
import { getKOEnumList } from './services';


export default {
  namespace: 'koPlan',

  state: {
    enumData: {},
    params: {},
  },

  effects: {
    *getKOEnumList({ payload }, { call, put }) {
      const response = yield call(getKOEnumList, payload);
      if (response.code) {
        const data = Array.isArray(response.data) ? response.data : [];
        const enumData = {};
        data.map(item => {
          enumData[item.type] = item.enumData;
        });
        yield put({
          type: 'saveKOEnumList',
          payload: { enumData }
        })

      } else {
        message.error(msgF(response.msg, response.msgDetail));
      }
    }

  },

  reducers: {
    saveParams(state, { payload }) {
      return { ...state, ...payload };
    },
    saveKOEnumList(state, { payload }) {
      return { ...state, ...payload };
    },
    save(state, { payload }) {
      return { ...state, ...payload };
    }
  },

  subscriptions: {},
};
