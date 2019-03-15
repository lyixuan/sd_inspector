import { message } from 'antd/lib/index';
import { province, examTotal,examOrg } from './services';

export default {
  namespace: 'exam',

  state: {
    dataList: [],
    examTotal: [],
    examOrg: [],
  },

  effects: {
    *province({ payload }, { call, put }) {
      console.log({...payload})
      const data = yield call(province, { ...payload });
      if (data.code === 20000) {
        yield put({ type: 'save' , payload: { dataList: data.data },});
      } else {
        message.error(data.msg);
      }
    },
    *examTotal(_, { call, put }) {
      const response = yield call(examTotal);
      if (response.code === 20000) {
        yield put({
          type: 'save',
          payload: { examTotal: response.data },
        })

      } else {
        message.error(response.msg)
      }
    },
    *examOrg({payload}, { call, put }) {
      const response = yield call(examOrg, payload);
      if (response.code === 20000) {
        yield put({
          type: 'save',
          payload: { examOrg: response.data },
        })

      } else {
        message.error(response.msg)
      }
    }
  },

  reducers: {
    saveDataList(state, { payload }) {
      const { dataList } = payload;
    },
    save(state, { payload }) {
      return { ...state, ...payload };
    }
  },

  subscriptions: {
  },
};
