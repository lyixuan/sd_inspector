import { message } from 'antd/lib/index';
import { msgF } from '@/utils/utils';
import { uploadMultipleFile,startAppeal } from '@/pages/scoreAppeal/appeal_create/services';

export default {
  namespace: 'appealCreateModel',

  state: {
    lunchData: null
  },

  effects: {
    *queryuploadMultipleFile({ payload }, { call, put }) {
      const result = yield call(uploadMultipleFile, { ...payload });
      console.log(result,'上传图片');
      if (result.code === 20000) {
        console.log(result,'上传图片20000');
        yield put({ type: 'save' });
      } else {
        message.error(msgF(result.msg,result.msgDetail));
      }
    },
    // 发起一次申诉
    *postStartAppeal({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(startAppeal, params);
      if (result.code === 20000) {
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

