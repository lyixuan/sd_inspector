import {
  getKnowledgeList,
} from './services';

import { message } from 'antd/lib/index';
import { msgF } from "@/utils/utils";

export default {
  namespace: 'robotData',
  state: {

  },
  effects: {
    // *getGoingActivity({ payload }, { call, put }) {
    //   const params = payload.params;
    //   const result = yield call(getGoingActivity, params.id);
    //   if (result.code === 200) {
    //     yield put({ type: 'save', payload: { knowledgeList: result.data } });
    //   } else if (result) {
    //     message.error(msgF(result.msg, result.msgDetail));
    //   }
    // },

  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },

  }
}
