import { message } from 'antd';
import { routerRedux } from 'dva/router';
import { getPrivilegeList, CurrentUserListRole, userChangeRole } from '@/services/api';
import storage from '@/utils/storage';

const handleLogin = (response) => {
  let saveObj = response || {};
  const { privilegeList = [], ...others } = response.data || {};
  const AuthList = Array.isArray(privilegeList) ? privilegeList : [];
  saveObj.privilegeList = AuthList;
  storage.setUserInfo({ ...others });
  storage.setUserAuth(privilegeList);
};

export default {
  namespace: 'login',

  state: {
    loginState: false,
    userInfo: {},
    currentUser: {},
    authList: [],
    roleList: [],
  },

  effects: {
    *loginin(_, { call, put }) {
      const isHasUserInfo = storage.isHasUserInfo();
      const authList = storage.getUserAuth();
      const userInfo = storage.getUserInfo();
      let loginState = false;
      if (!isHasUserInfo || !authList) {
        const response = yield call(getPrivilegeList);
        if (response.code === 20000) {
          const data = response.data || {};
          const { privilegeList, ...others } = data;
          const { token, userId } = userInfo;
          const saveObj = { token, userId, ...others };
          storage.setUserInfo(saveObj);
          storage.setUserAuth(privilegeList);
        } else {
          message.error(response.msg);
        }
      } else {
        loginState = true;
      }
      yield put({
        type: 'changeLoginStatus',
        payload: { loginState }
      });
    },
    *CurrentUserListRole({ payload }, { call, put }) {
      const response = yield call(CurrentUserListRole, { ...payload });
      if (response.code === 2000) {
        yield put({
          type: 'saveRoleList',
          payload: { roleList: Array.isArray(response.data) ? response.data : [] },
        });
      } else {
        message.error(response.msg);
      }
    },
    *changeRole({ payload }, { call, put }) {
      const response = yield call(userChangeRole, { ...payload });

      if (response.code === 2000 && response.privilegeList.length > 0) {
        handleLogin(response);
        yield put({
          type: 'menu/getMenu',
          payload: { routeData: response.privilegeList },
        });
        yield put(routerRedux.push('/'));
      } else {
        message.error(response.msg);
      }
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
    },

  },

  reducers: {
    saveUserInfo(state, { payload }) {
      return { ...state, ...payload }
    },
    changeLoginStatus(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    saveAuthList(state, { payload }) {
      const authList = payload || [];
      return { ...state, authList };
    },
    saveRoleList(state, { payload }) {
      return { ...state, ...payload };
    },
  },

  subscriptions: {
  },
};