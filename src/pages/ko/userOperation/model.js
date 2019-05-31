import { } from './services';
import { message } from 'antd/lib/index';
import { userGroupList, userGroupEdit, userGroupDelete } from './services';
import { msgF } from '@/utils/utils';

export default {
  namespace: 'userOperation',

  state: {
    userGroupList: [],
    visible: false
  },

  effects: {
    *userGroupDelete({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(userGroupDelete, params);
      if (result.code === 20000) {
        console.log(18, result)
        yield put({ type: 'save', payload: {} });
      } else {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    *userGroupEdit({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(userGroupEdit, params);
      if (result.code === 20000) {
        message.success('编辑成功！');
        const groupCheck = result.data.data;
        yield put({ type: 'save', payload: { groupCheck, visible: false } });
      } else {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    *userGroupList(_, { call, put }) {
      const result = yield call(userGroupList);
      if (result.code === 20000) {
        const userGroupList = result.data;
        yield put({ type: 'save', payload: { userGroupList } });
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
