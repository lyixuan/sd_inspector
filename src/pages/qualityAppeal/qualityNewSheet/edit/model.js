import { message } from 'antd/lib/index';
import { updateQuality } from './services';
import router from 'umi/router';
import { msgF } from '@/utils/utils';

export default {
  namespace: 'editQualityNewSheet',

  state: {

  },

  effects: {
    *updateQuality({ payload }, { call, put }) {
      const result = yield call(updateQuality, { ...payload });
      if (result.code === 20000) {
        message.success('提交成功');
        yield put(router.push('/qualityAppeal/qualityNewSheet'));

      } else {
        message.error(msgF(result.msg,result.msgDetail));
      }
    },
  },

  reducers: {},

  subscriptions: {},
};
