import { message } from 'antd';
import { getTableList, userGroupCheck, userGroupSubmit } from '@/pages/ko/userList/services';
import { msgF } from '@/utils/utils';


export default {
  namespace: 'workTableModel',

  state: {
    workList: [],
    pageParams: {
      currentPage: 1,
      pageSize: 30
    },
    visible: false,
    visible2: false,
    groupCheck: true,
    groupSubmit: null
  },
  effects: {
    *userGroupSubmit({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(userGroupSubmit, params);
      if (result.code === 20000) {
        // message.success('提交成功！');
        const groupSubmit = result.data;
        yield put({ type: 'save', payload: { groupSubmit, visible: false, visible2: true } });
      } else {
        // yield put({ type: 'save', payload: { visible: false } });
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    *userGroupCheck({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(userGroupCheck, params);
      if (result.code === 20000) {
        const groupCheck = result.data.exist;
        yield put({ type: 'save', payload: { groupCheck } });
      } else {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    *getTableList({ payload }, { call, put }) {
      // 列表
      const params = payload.params;
      const result = yield call(getTableList, params);
      const { pageSize, currentPage } = params;
      if (result.code === 20000) {
        const data = result.data || {};
        const workList = Array.isArray(data.resultList) ? data.resultList : [];
        const { totalUser, totalCount, currentPage } = data;
        yield put({ type: 'save', payload: { workList, totalUser, currentPage, totalCount } });
        yield put({
          type: 'koPlan/saveUserData',
          payload: { usersData: { totalCount: totalUser } }
        })
      } else {
        message.error(msgF(result.msg, result.msgDetail));
      }
      yield put({
        type: 'savePageParams',
        payload: { pageParams: { pageSize, currentPage } },

      })
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
    savePageParams(state, { payload }) {
      return { ...state, ...payload };
    }

  },

  subscriptions: {},
};
