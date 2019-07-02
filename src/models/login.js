import { message } from 'antd';
import { routerRedux } from 'dva/router';
import { getPrivilegeList,getPrivilegeList2,userInfo, CurrentUserListRole, userChangeRole } from '@/services/api';
import storage from '@/utils/storage';
import { msgF } from '@/utils/utils';

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
    // todo 1 进入域名首页，请求该接口（获取用户信息和权限信息），先从缓存获取，失败后从接口获取，再失败（非401）跳转到sso登录地址；如401，在request.js页面拦截跳转到sso登录地址

    *initSubSystem(_, { call, put }) {
      // 初始化系统，判断缓存信息是否存在，不存在从接口获取。
      const admin_user = storage.getItem('admin_user');
      const admin_auth = storage.getItem('admin_auth');
      if (!admin_user) {
        const response = yield call(userInfo);
        if (response.code === 20000) {
          const data = response.data || {};
          const { token, userId, ...others } = data;
          const saveObj = { token, userId, ...others };
          storage.setItem('admin_user',saveObj);
        } else {
          message.error(msgF(response.msg,response.msgDetail));
        }
      }
      if (!admin_auth) {
        const response = yield call(getPrivilegeList2);
        if (response.code === 20000) {
          const data = response.data || {};
          const { privilegeList } = data;
          storage.setItem('admin_auth',privilegeList);
        } else {
          message.error(msgF(response.msg,response.msgDetail));
        }
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
