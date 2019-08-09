import { message } from 'antd/lib/index';
import { getList1,getList2,updateData } from './services';
import { msgF } from '@/utils/utils';

export default {
  namespace: 'smallPro',

  state: {
    dataList1: [],
    dataList2: [],
  },

  effects: {
    *getList1({ payload }, { call, put }) {
      const result = yield call(getList1, payload);
      if (result.code === 20000) {
        let dataList1 = result.data ? result.data : [];
        if(dataList1.length===0){
          const obj = {};
          obj.bannerImgUrl = '';
          obj.bannerLinkUrl = '';
          obj.sort = 1;
          dataList1=[obj];
        }
        yield put({ type: 'save', payload: { dataList1 } });
      } else {
        message.error(msgF(result.msg,result.msgDetail));
      }
    },
    *getList2({ payload }, { call, put }) {
      const result = yield call(getList2, payload);
      if (result.code === 20000) {
        let dataList2 = result.data ? result.data : [];
        if(dataList2.length===0){
          const obj = {};
          obj.bannerImgUrl = '';
          obj.bannerLinkUrl = '';
          obj.sort = 1;
          dataList2=[obj];
        }
        yield put({ type: 'save', payload: { dataList2 } });
      } else {
        message.error(msgF(result.msg,result.msgDetail));
      }
    },
    *updateData({ payload }, { call, put }) {
      const response = yield call(updateData, payload);
      if (response.code === 20000) {
        message.success('保存成功');
        return true
      } else {
        message.error(msgF(response.msg,response.msgDetail))
      }
    },
    *updateData2({ payload }, { call, put }) {
      const response = yield call(updateData, payload);
      if (response.code === 20000) {
        message.success('保存成功');
        return true
      } else {
        message.error(msgF(response.msg,response.msgDetail))
      }
    },
  },
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
    saveList(state, action) {
      return { ...state, ...action.payload };
    },
  },

  subscriptions: {
  },
};

