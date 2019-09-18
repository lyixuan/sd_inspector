import { message } from 'antd';
import { routerRedux } from 'dva/router';
import router from 'umi/router';
import { getPrivilegeList, getPrivilegeListNew, getUserInfoNew, CurrentUserListRole, userChangeRole, getCertificationList } from '@/services/api';
import storage from '@/utils/storage';
import { msgF } from '@/utils/utils';
import { redirectToLogin, casLogout, casLogoutDev } from '@/utils/routeUtils';
import { DEBUGGER_USER } from '@/utils/constants';

export default {
  namespace: 'login',

  state: {
    loginState: false,
    userInfo: {},
    currentUser: {},
    authList: [],
    roleList: [],
    certificationList: []
  },

  effects: {
    *initSubSystem({ payload }, { call, put }) {
      const response = yield call(getUserInfoNew, { ...payload });
      if (!response) return;
      const codeMsg403 = 10300;
      const data = response.data || {};
      const { userName, userId, mail, positionCount,token,userType } = data;
      const saveObj = { userName, userId, mail, positionCount,token,userType };

      switch (response.code) {
        case 2000:
          storage.setItem('admin_user', saveObj);

          return yield put({ type: 'getProvilege', payload: { params: {} } });
          break;
        case codeMsg403:
          yield put(router.push('/exception/403'));
          break;
        default:
          message.error(response.msg);
          break;
      }
    },
    *getProvilege(_, { call, put }) {
      const response = yield call(getPrivilegeListNew);
      if (!response) return false;
      if (response.code === 2000) {
        const data = response.data || null;
        storage.setItem('admin_auth', data);
        yield put(routerRedux.push('/xdWorkbench/index'));
        return true
      } else {
        message.error(response.msg);
      }
    },
    *loginin(_, { call, put }) {
      const isHasUserInfo = storage.isRepeatLogin();
      const userInfo = storage.getUserInfo();
      let loginState = false;
      if (isHasUserInfo) {
        const response = yield call(getPrivilegeList);
        if (response.code === 20000) {
          const data = response.data || {};
          const { privilegeList, ...resothers } = data;
          const { token, userId, ...others } = userInfo;
          const saveObj = { token, userId, ...others, ...resothers };
          storage.setUserInfo(saveObj);
          storage.setUserAuth(privilegeList);
        } else {
          loginState = false;
          message.error(msgF(response.msg, response.msgDetail));
        }
      } else {
        loginState = true;
      }
      yield put({
        type: 'menu/getMenu',
      })
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
        message.error(msgF(response.msg, response.msgDetail));
      }
    },
    *getCertificationList({ payload, callback }, { call, put }) {
      const response = yield call(getCertificationList);
      if (response.code === 20000) {
        console.log(98, response.data)
        yield put({
          type: 'saveRoleList',
          payload: { certificationList: response.data },
        });
        if (callback) {
          callback(response.data);
        }
      } else {
        message.error(msgF(response.msg, response.msgDetail));
      }
    },
    *changeRole({ payload }, { call, put }) {
      const response = yield call(userChangeRole, { ...payload });
      if (response.code === 2000) {
        const userInfo = storage.getUserInfo();
        const data = response.data || {};
        const { privilegeList, ...others } = data;
        const saveObj = { ...userInfo, ...others };
        storage.setUserInfo(saveObj);
        storage.setUserAuth(privilegeList);
        yield put({
          type: 'menu/getMenu',
          payload: { routeData: response.privilegeList },
        });
        yield put(routerRedux.push('/'));
      } else {
        message.error(msgF(response.msg, response.msgDetail));
      }
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
    },

    *logout() {
      if (DEBUGGER_USER) {
        casLogoutDev();
      } else {
        casLogout();
      }

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
