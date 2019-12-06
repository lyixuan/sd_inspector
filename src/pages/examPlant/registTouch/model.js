import { message } from 'antd';
import { msgF } from '@/utils/utils';
import {
  getExamList,
  getProvinceData
} from './services';

export default {
  namespace: 'admissionTicket',

  state: {
    yearMonthList: []
  },

  effects: {
    *getExamList({ }, { call, put }) {
      const response = yield call(getExamList);
      const res = yield call(getProvinceData, { id: response.data[0].id })
      if (response && response.code === 20000) {
        yield put({
          type: 'save',
          payload: { yearMonthList: response.data, selectVal: response.data[0].id },
        });
        yield put({
          type: 'saveData',
          payload: { provinceExamList: res.data.list, systemTime: res.data.systemTime },
        });
      } else if (response) {
        message.error(response.msg)
      }
    },

  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },

  },
};
