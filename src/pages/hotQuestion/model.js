import {
  getKnowledgeList,
  getQuestionType,
  getQuestionList,
  getGuessData,
  getAnswer
} from './services';

import { message } from 'antd/lib/index';
import { msgF } from "@/utils/utils";

export default {
  namespace: 'hotQuestion',
  state: {
    knowledgeList: [],
    questionTypeList: [],
    questionList: [],
    guessData: {},
    answer: {}
  },
  effects: {
    *getKnowledgeList({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(getKnowledgeList, params);
      if (result.code === 200) {
        yield put({ type: 'save', payload: { knowledgeList: result.data } });
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    *getQuestionType({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(getQuestionType, params.id);
      if (result.code === 200) {
        yield put({ type: 'save', payload: { questionTypeList: result.data } });
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    *getQuestionList({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(getQuestionList, params);
      if (result.code === 200) {
        yield put({ type: 'save', payload: { questionList: result.data } });
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    *getGuessData({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(getGuessData, params);
      if (result.code === 200) {
        yield put({ type: 'save', payload: { guessData: result.data[0] } });
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    *getAnswer({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(getAnswer, params);
      if (result.code === 200) {
        yield put({ type: 'save', payload: { answer: result.data } });
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
