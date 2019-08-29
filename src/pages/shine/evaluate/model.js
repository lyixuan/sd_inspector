import { message } from 'antd/lib/index';
import { getList } from './services';
import { msgF } from '@/utils/utils';

export default {
  namespace: 'evaluate',

  state: {
    dataList: [],
    page: {},
  },

  effects: {
    *getList({ payload }, { call, put }) {
      const result = yield call(getList, payload);
      if (result.code === 20000) {
        const dataList = result.data.list ? result.data.list : [];
        const page = { total: result.data.total ? result.data.total : 0, pageNum: result.data.pageNum ? result.data.pageNum : 1 };
        yield put({ type: 'save', payload: { dataList, page } });
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

