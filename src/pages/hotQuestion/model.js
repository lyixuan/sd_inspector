import {
  getKnowledgeList,
  getQuestionType,
  getQuestion
} from './services';

import { message } from 'antd/lib/index';
import { msgF } from "@/utils/utils";

export default {
  namespace: 'hotQuestion',
  state: {},
  effects: {
    *getKnowledgeList({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(getKnowledgeList, params);
      if (result.code === 200) {
        yield put({ type: 'save', payload: { imDetailList: result } });
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    *getQuestionType({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(getQuestionType, params);
      if (result.code === 200) {
        yield put({ type: 'save', payload: { imDetailList: result } });
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  }
}
