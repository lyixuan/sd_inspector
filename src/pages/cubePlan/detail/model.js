import { message } from 'antd/lib/index';
import {
  getDetail,
  getCommentPage,
  saveUserComment,
  getOutwardNameList,
  getQRCode,
  getCopyUrl,
  getMiniProgramCode } from './services';
import { msgF } from '@/utils/utils';

export default {
  namespace: 'cubePlanDetail',

  state: {
    detailInfo: {},
    commentData:{},
    commentLists:[]
  },

  effects: {
    *getCubeDetail({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(getDetail, params);
      if (result.code === 20000) {
        const detailInfo = result.data||{};
        yield put({ type: 'save', payload: { detailInfo } });
      } else {
        message.error(msgF(result.msg,result.msgDetail));
      }
    },
    *getCommentPage({ payload }, { call, put }) {
      const {id,pageSize,page,commentLists:oldLists} = payload.params;

      const params = {id,pageSize,page};
      const result = yield call(getCommentPage, params);
      if (result.code === 20000) {
        const commentData = result.data||{};
        let commentLists = [];
        if(page!==1){
          commentLists = oldLists.concat(commentData.list);
        } else {
          commentLists = [].concat(commentData.list);
        }

        yield put({ type: 'save', payload: {commentData,commentLists }});
      } else {
        message.error(msgF(result.msg,result.msgDetail));
      }
    },
    *saveUserComment({ payload }, { call, put }) {
      const result = yield call(saveUserComment, payload);
      if (result.code === 20000) {
        return true;
      } else {
        message.error(msgF(result.msg,result.msgDetail));
      }
    },
    *getOutwardNameList({ payload }, { call, put }) {
      const result = yield call(getOutwardNameList);
      if (result.code === 20000) {
        const OutwardName = result.data||[];
        yield put({ type: 'save', payload: {OutwardName }});
        return true;
      } else {
        message.error(msgF(result.msg,result.msgDetail));
      }
    },
    *getQRCode({ payload }, { call, put }) {
      const params = payload.params;
      const {usedH5} = params;
      delete params.usedH5;
      let result;
      if (usedH5) {
        result = yield call(getQRCode, params)
      } else {
        result = yield call(getMiniProgramCode,params);
      }
      let qrCode;
      if (result.code === 200) {
        qrCode = result.data;
        yield put({ type: 'save', payload: {qrCode }});
        return true;
      } else if (result.code === 20000) {
        qrCode = result.data.qrcodeUrl;
        yield put({ type: 'save', payload: {qrCode }});
        return true;
      } else {
        message.error(msgF(result.msg,result.msgDetail));
      }
    },
    *getCopyUrl({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(getCopyUrl,params);
      if (result.code === 20000) {
        if(params.usedType===11) {
          const copyBottomUrl = result.data.copyUrl;
          yield put({ type: 'save', payload: {copyBottomUrl }});
        } else {
          const copyUrl = result.data.copyUrl;
          yield put({ type: 'save', payload: {copyUrl }});
        }
        return true;
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

