import {
  getDateRange,
  getDateList2,
  imAct,
  bbsAct,
  chatMessageAct,
  wechatAct,
  learningAct,
  userInfo,
  getBasicInfo,
  getTagInfo,
  getStatInfo,
  getDetailInfo,
  getExamScore,
} from './services';
import { message } from 'antd/lib/index';
import { msgF } from '@/utils/utils';

export default {
  namespace: 'behaviorPath',

  state: {
    dateListStudy: [],
    dateListIm: [],
    dateListWechart: [],
    dateListBbs: [],
    dateListLetter: [],
    imData: [],
    studyData: null,
    bbsData: [],
    wechartData: [],
    letterData: [],
    dateRange: null,
    imTotal: 0,
    studyTotal: 0,
    weChartTotal: 0,
    bbsTotal: 0,
    letterTotal: 0,
    allTotal: 0,
    userInfo: null
  },

  effects: {
    *getDateList({ payload }, { call, put }) {
      const params = payload.params;
      const data = yield call(getDateList2, params);
      let dateFormat;
      if (params.type != 2) {
        dateFormat =
          data.data.list && data.data.list[0] ? data.data.list[0].replace(/[\u4e00-\u9fa5]/g, '-').split('-') : null;
      } else {
        dateFormat = data.data.list && data.data.list[0] ? data.data.list[0].fmtCountDate.replace(/[\u4e00-\u9fa5]/g, '-').split('-') : null;
      }


      let studyData = {};
      let imData = {};
      let wechartData = {};
      let bbsData = {};
      let letterData = {};
      if (dateFormat) {
        dateFormat.length = 3;
        if (params.type == 1) {
          studyData = yield call(learningAct, {
            beginDate: dateFormat.join('-'),
            stuid: params.stuId,
          });
        } else if (params.type == 2) {
          imData = yield call(imAct, { beginDate: dateFormat.join('-'), stuid: params.stuId });
        } else if (params.type == 3) {
          wechartData = yield call(wechatAct, {
            beginDate: dateFormat.join('-'),
            stuid: params.stuId,
          });
        } else if (params.type == 4) {
          bbsData = yield call(bbsAct, { beginDate: dateFormat.join('-'), stuid: params.stuId });
        } else if (params.type == 5) {
          letterData = yield call(chatMessageAct, {
            beginDate: dateFormat.join('-'),
            stuid: params.stuId,
          });
        }
      }

      if (data.code === 20000) {
        const dateList = data.data.list || [];
        const pagerTotal = data.data.total;
        if (payload.fn) {
          yield put({
            type: 'save',
            payload: {
              allTotal: pagerTotal
            },
          });
          payload.fn(pagerTotal)
        }
        if (params.type == 1) {
          yield put({
            type: 'save',
            payload: {
              dateListStudy: dateList,
              studyData: studyData.data,
              studyTotal: pagerTotal
            },
          });
        } else if (params.type == 2) {
          yield put({
            type: 'save',
            payload: {
              dateListIm: dateList,
              imData: imData.data,
              imTotal: pagerTotal
            },
          });
        } else if (params.type == 3) {
          yield put({
            type: 'save',
            payload: {
              dateListWechart: dateList,
              wechartData: wechartData.data,
              weChartTotal: pagerTotal
            },
          });

        } else if (params.type == 4) {
          yield put({
            type: 'save',
            payload: {
              dateListBbs: dateList,
              bbsData: bbsData.data,
              bbsTotal: pagerTotal
            },
          });
        } else if (params.type == 5) {
          yield put({
            type: 'save',
            payload: {
              dateListLetter: dateList,
              letterData: letterData.data,
              letterTotal: pagerTotal
            },
          });
        }
      } else {
        message.error(msgF(data.msg, data.msgDetail));
      }
    },
    // *getDateList({ payload }, { call, put }) {
    //   const data = yield call(getDateList, {});
    //   const dateFormat = data.data[0].replace(/[\u4e00-\u9fa5]/g, "-").split("-");
    //   dateFormat.length = 3;
    //   const imData = yield call(imAct, { beginDate: dateFormat.join("-"), stuid: payload.stuId });
    //   const studyData = yield call(learningAct, { beginDate: dateFormat.join("-"), stuid: payload.stuId });
    //   const wechartData = yield call(wechatAct, { beginDate: dateFormat.join("-"), stuid: payload.stuId });
    //   const bbsData = yield call(bbsAct, { beginDate: dateFormat.join("-"), stuid: payload.stuId });
    //   const letterData = yield call(chatMessageAct, { beginDate: dateFormat.join("-"), stuid: payload.stuId });

    //   if (data.code === 20000 && imData.code === 20000) {
    //     yield put({
    //       type: 'save',
    //       payload: {
    //         dateList: data.data,
    //         imData: imData.data,
    //         studyData: studyData.data,
    //         wechartData: wechartData.data,
    //         bbsData: bbsData.data,
    //         letterData: letterData.data
    //       }
    //     });
    //   } else {
    //     message.error(msgF(data.msg, data.msgDetail));
    //   }
    // },
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
    *getDateRange({ payload }, { call, put }) {
      const result = yield call(getDateRange, {});
      if (result.code === 20000) {
        const dateRange = result.data || [];
        yield put({ type: 'save', payload: { dateRange } });
      } else {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    *userInfo({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(userInfo, params);
      if (result.code === 20000) {
        const userInfo = result.data.map;
        yield put({ type: 'save', payload: { userInfo } });
      } else {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    // 用户画像
    *getBasicInfo({ payload }, { call, put }) {
      const params = payload.params;
      if(params && params.stuId && params.stuId>2147483647){
        message.warn('学院ID不合法');
        return;
      }
      const result = yield call(getBasicInfo, params);
      if (result.code === 20000) {
        const BasicInfo = result.data;
        yield put({ type: 'save', payload: { BasicInfo } });
      } else if(result.code === 20003){
        const BasicInfo = result.data;
        yield put({ type: 'save', payload: { BasicInfo } });
        message.warn(result.msgDetail);
      } else {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    *getTagInfo({ payload }, { call, put }) {
      const params = payload.params;
      if(params && params.stuId && params.stuId>2147483647){
        return;
      }
      const result = yield call(getTagInfo, params);
      if (result.code === 20000) {
        const TagInfo = result.data;
        yield put({ type: 'save', payload: { TagInfo } });
      } else if (result.code === 20003){
        const TagInfo = result.data;
        yield put({ type: 'save', payload: { TagInfo } });
      }
    },
    *getStatInfo({ payload }, { call, put }) {
      const params = payload.params;
      if(params && params.stuId && params.stuId>2147483647){
        return;
      }
      const result = yield call(getStatInfo, params);
      if (result.code === 20000) {
        const StatInfo = result.data;
        yield put({ type: 'save', payload: { StatInfo } });
      } else if (result.code === 20003){
        const StatInfo = result.data;
        yield put({ type: 'save', payload: { StatInfo } });
      }
    },
    *getDetailInfo({ payload }, { call, put }) {
      const params = payload.params;
      if(params && params.stuId && params.stuId>2147483647){
        return;
      }
      const result = yield call(getDetailInfo, params);
      if (result.code === 20000) {
        const DetailInfo = result.data;
        yield put({ type: 'save', payload: { DetailInfo } });
      } else if (result.code === 20003){
        const DetailInfo = result.data;
        yield put({ type: 'save', payload: { DetailInfo } });
      }
    },
    *getExamScore({ payload }, { call, put }) {
      const params = payload.params;
      if(params && params.stuId && params.stuId>2147483647){
        return;
      }
      const result = yield call(getExamScore, params);
      if (result.code === 20000) {
        const ScoreData = result.data;
        yield put({ type: 'save', payload: { ScoreData } });
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
