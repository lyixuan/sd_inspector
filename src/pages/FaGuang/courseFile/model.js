import { message } from 'antd/lib/index';
import { getList, delelte, addData,getPPTList } from './services';
import { msgF } from '@/utils/utils';

export default {
  namespace: 'courseFile',

  state: {
    dataList: [],
    page: {},
  },

  effects: {
    *getList({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(getList, params);
      if (result.code === 20000) {
        const dataList = result.data.list ? result.data.list : [];
        const page = { total: result.data.total ? result.data.total : 0, pageNum: result.data.pageNum ? result.data.pageNum : 1 };
        yield put({ type: 'save', payload: { dataList, page } });
      } else {
        message.error(msgF(result.msg,result.msgDetail));
      }
    },
    *getPPTList({ payload }, { call, put }) {
      const result = yield call(getPPTList, payload);
      if (result.code === 20000) {
        const pptList = result.data ? result.data : [];
        yield put({ type: 'save', payload: { pptList } });
        return pptList;
      } else {
        message.error(msgF(result.msg,result.msgDetail));
      }
    },
    *delelte({ payload }, { call }) {
      const params = payload.params;
      const result = yield call(delelte, params);
      if (result.code === 20000) {
        message.success('删除成功');
      } else {
        message.error(msgF(result.msg,result.msgDetail));
      }
    },
    *addData({ payload }, { call, put }) {
      const response = yield call(addData, payload);
      if (response.code === 20000) {
        message.success('保存成功');
        return true
      } else {
        message.error(msgF(response.msg,response.msgDetail))
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

