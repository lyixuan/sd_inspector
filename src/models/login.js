import { Base64 } from 'js-base64';
import { message } from 'antd';
import { getUserAuthList } from '@/services/api';
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
  },

  effects: {
    *loginin({ payload }, { call, put }) {
      const { userInfo = '', pathname } = payload;
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
    }
  },

  reducers: {
    saveUserInfo(state, { payload }) {
      return { ...state, ...payload }
      console.log(payload)
    },
  },

  subscriptions: {
  },
};