import { Base64 } from 'js-base64';
import { message } from 'antd';
import { routerRedux } from 'dva/router';
import { getUserAuthList, CurrentUserListRole, userChangeRole } from '@/services/api';
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
    userInfo: {},
    currentUser: {},
    authList: [],
    roleList: [],
  },

  effects: {
    *loginin({ payload }, { call, put }) {
      const { userInfo = '' } = payload;
      if (typeof userInfo === 'string') {
        try {
          const params = JSON.parse(Base64.decode(userInfo));
          const { mail, password } = params;    //  
          const response = yield call(getUserAuthList, { mail, password });
          if (response.code === 2000) {
            handleLogin(response);
            yield put({
              type: 'saveUserInfo',
              payload: { userInfo: response.data },
            })
            yield
          } else {
            message.error(response.msg);
          }

        } catch (error) {
          message.error(`参数传递异常!${error.name}`);
        }
      } else {
        message.error('参数传递异常');
      }
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
      const saveObj = handleLogin(response);
      if (saveObj.code === 2000 && saveObj.privilegeList.length > 0) {
        yield put({
          type: 'menu/getMenu',
          payload: { routeData: saveObj.privilegeList },
        });
        yield put(routerRedux.push('/'));
      } else {
        message.error(saveObj.msg);
      }
      yield put({
        type: 'changeLoginStatus',
        payload: saveObj,
      });
    },

  },

  reducers: {
    saveUserInfo(state, { payload }) {
      return { ...state, ...payload }
    },
    changeLoginStatus(state, { payload }) {
      const loginStatusObj = {
        status: payload.code === 2000,
        msg: payload.msg,
      };
      return {
        ...state,
        loginStatusObj,
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