import { message } from 'antd/lib/index';
import { getTaskPage,deleteTask,reloadTask } from './service';

export default {
  namespace: 'detail',

  state: {
    tableList:[]
  },

  effects: {
    // 任务列表
    *getTaskPage({ payload }, { call, put }) {
      const result = yield call(getTaskPage, payload.params);
      const tableList = result.data || [];
      if (result && result.code === 20000) {
        yield put({ type: 'save', payload: { tableList } });
      } else {
        message.error(result.msg);
      }
    },
    // 删除查询条件
    *deleteTask({ payload }, { call, put }) {
      const result = yield call(deleteTask, payload.params);
      if (result.code === 20000) {
        yield put({ type: 'save', payload: {} });
      } else {
        message.error(result.msg);
      }
    },
    // 重新加载任务
    *reloadTask({ payload }, { call, put }) {
      const result = yield call(reloadTask, payload.params);
      if (result.code === 20000) {
        yield put({ type: 'save', payload: {} });
      } else {
        message.error(result.msg);
      }
    }
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

  subscriptions: {
  },
};
