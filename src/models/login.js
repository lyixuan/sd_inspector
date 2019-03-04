import { Base64 } from 'js-base64';
import { message } from 'antd';
import { getUserAuthList, loginOut } from '@/services/api';

export default {
  namespace: 'login',

  state: {
  },

  effects: {
    *loginin({ payload }, { call, put }) {
      const id = payload.id || '';
      if (typeof id === 'string') {
        try {
          // const params = Base64.decode(id);
          // const response = yield call(getUserAuthList);
          const response1 = yield call(loginOut);
          console.log(response1);


        } catch (error) {
          message.error(`参数传递异常!${error.name}`);
        }




      } else {
        message.error('参数传递异常');
      }
    }
  },

  reducers: {
  },

  subscriptions: {
  },
};