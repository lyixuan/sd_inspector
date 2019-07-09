import { message } from 'antd';
import { routerRedux } from 'dva/router';
import router from 'umi/router';
import { getPrivilegeList,getPrivilegeListNew,getUserInfoNew, CurrentUserListRole, userChangeRole } from '@/services/api';
import storage from '@/utils/storage';
import { msgF } from '@/utils/utils';
import { redirectToLogin ,casLogout} from '@/utils/routeUtils';

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
    *initSubSystem(_, { call, put }) {

      const response2 = yield call(getUserInfoNew);
      const codeMsg403 = 10300;
      if (!response2) return;
      switch (response2.code) {
        case 20000:
          const data = response2.data || {};
          const { userName, userId, mail, positionCount } = data;
          const saveObj = { userName, userId, mail, positionCount };
          storage.setItem('admin_user', saveObj);
          break;
        case codeMsg403:
          yield put(router.push('/exception/403'));
          break;
        default:
          message.error(response2.msg);
          break;
      }
      const response = yield call(getPrivilegeListNew);
      if (!response) return;
      if (response.code === 20000) {
        const data = response.data || {};
        storage.setItem('admin_auth', data);
        yield put(routerRedux.push('/'));
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
          message.error(msgF(response.msg,response.msgDetail));
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
        message.error(msgF(response.msg,response.msgDetail));
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
        message.error(msgF(response.msg,response.msgDetail));
      }
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
    },

    *logout( ) {
      storage.removeStorge('admin_user');
      storage.removeStorge('admin_auth');
      casLogout();
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
