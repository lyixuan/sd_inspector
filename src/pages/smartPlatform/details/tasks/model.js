import { message } from 'antd/lib/index';
import { routerRedux } from 'dva/router';
import { getTaskPage,deleteTask,reloadTask } from './service';

export default {
  namespace: 'detail',

  state: {
    tableList:[],
    total:0,
  },

  effects: {
    // 任务列表
    *getTaskPage({ payload }, { call, put }) {
      const result = yield call(getTaskPage,{...payload});
      const tableList = result.data?result.data.list : [];
      const total = result.data?result.data.total : [];
      if (result.code === 20000) {
        yield put({ type: 'saveLsit', payload: { tableList,total} });
      } else {
        message.error(result.msg);
      }
    },
    // 删除查询条件
    *deleteTask({ payload }, { call, put }) {
      const result = yield call(deleteTask, {...payload});
      if (result.code === 20000) {
        yield put(routerRedux.push('/smartPlatform/details/tasks'));
      } else {
        message.error(result.msg);
      }
    },
    // 重新加载任务
    *reloadTask({ payload }, { call, put }) {
      const result = yield call(reloadTask,{...payload});
      if (result.code === 20000) {
        yield put(routerRedux.push('/smartPlatform/details/tasks'));
      } else {
        message.error(result.msg);
      }
    }
  },

  reducers: {
    saveLsit(state, {payload}) {
      const {tableList} = payload;
      if (tableList) {
        tableList.forEach((item, i) => {
          tableList[i].key = i+1;
        });
      }
      return { ...state, ...payload };
    },
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

  subscriptions: {
  },
};
