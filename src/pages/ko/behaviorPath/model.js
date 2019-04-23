import { getDateList, imAct, bbsAct, chatMessageAct, wechatAct, learningAct } from './services';
import { message } from 'antd/lib/index';
import { msgF } from '@/utils/utils';

export default {
  namespace: 'behaviorPath',

  state: {
    dateList: [],
    imData: [],
    studyData: null,
    bbsData: [],
    wechartData: [],
    letterData: []
  },

  effects: {
    *getDateList({ payload }, { call, put }) {
      const data = yield call(getDateList, {});
      const dateFormat = data.data[0].replace(/[\u4e00-\u9fa5]/g, "-").split("-");
      dateFormat.length = 3;
      const imData = yield call(imAct, { beginDate: dateFormat.join("-"), stuid: payload.stuId });
      const studyData = yield call(learningAct, { beginDate: dateFormat.join("-"), stuid: payload.stuId });
      const wechartData = yield call(wechatAct, { beginDate: dateFormat.join("-"), stuid: payload.stuId });
      const bbsData = yield call(bbsAct, { beginDate: dateFormat.join("-"), stuid: payload.stuId });
      const letterData = yield call(chatMessageAct, { beginDate: dateFormat.join("-"), stuid: payload.stuId });

      if (data.code === 20000 && imData.code === 20000) {
        yield put({
          type: 'save',
          payload: {
            dateList: data.data,
            imData: imData.data,
            studyData: studyData.data,
            wechartData: wechartData.data,
            bbsData: bbsData.data,
            letterData: letterData.data
          }
        });
      } else {
        message.error(msgF(data.msg, data.msgDetail));
      }
    },
    *imAct({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(imAct, params);
      if (result.code === 20000) {
        const imData = result.data || [];
        yield put({ type: 'save', payload: { imData } });
      } else {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    *learningAct({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(learningAct, params);
      if (result.code === 20000) {
        const studyData = result.data || [];
        yield put({ type: 'save', payload: { studyData } });
      } else {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    *wechatAct({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(wechatAct, params);
      if (result.code === 20000) {
        const wechartData = result.data || [];
        yield put({ type: 'save', payload: { wechartData } });
      } else {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    *bbsAct({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(bbsAct, params);
      if (result.code === 20000) {
        const bbsData = result.data || [];
        yield put({ type: 'save', payload: { bbsData } });
      } else {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    *chatMessageAct({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(chatMessageAct, params);
      if (result.code === 20000) {
        const letterData = result.data || [];
        yield put({ type: 'save', payload: { letterData } });
      } else {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },



  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },

  subscriptions: {},
};
