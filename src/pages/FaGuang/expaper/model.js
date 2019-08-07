import { message } from 'antd/lib/index';
import { getList } from './services';
import { msgF } from '@/utils/utils';

export default {
  namespace: 'expaper',

  state: {
    dataList: [],
    rowGroup:[]
  },

  effects: {
    *getList({ payload }, { call, put }) {
      const result = yield call(getList, payload);
      if (result.code === 20000) {
        const data = result.data ? result.data : [];
        let dataList = [];
        let rowGroup = [];
        for(const key in data){
          dataList = dataList.concat(data[key]);
          rowGroup.push(data[key].length)
        }

        yield put({ type: 'save', payload: { dataList,rowGroup } });
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

