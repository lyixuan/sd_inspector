import { message } from 'antd/lib/index';
import { routerRedux } from 'dva/router';
import { msgF } from '@/utils/utils';
import {
  uploadMultipleFile
} from './servers';

export default {
  namespace: 'appealCreateModel',

  state: {
    lunchData: null
  },

  effects: {
    *queryuploadMultipleFile({ payload }, { call, put }) {
      const result = yield call(uploadMultipleFile, { ...payload });
      if (result.code === 20000) {
        console.log(result,'上传图片20000');
        yield put({ type: 'save' });
      } else {
        message.error(msgF(result.msg,result.msgDetail));
      }
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

  subscriptions: {
  },
};

