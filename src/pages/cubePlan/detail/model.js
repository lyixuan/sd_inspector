import { message } from 'antd/lib/index';
import { getDetail,getCommentPage } from './services';
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
        const commentLists = oldLists.concat(commentData.list);
        yield put({ type: 'save', payload: {commentData,commentLists }});
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

