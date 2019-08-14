import { message } from 'antd/lib/index';
import { getList,getRole,updateData } from './services';
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

        yield put({ type: 'save', payload: { dataList,rowGroup ,srcData:data} });
      } else {
        message.error(msgF(result.msg,result.msgDetail));
      }
    },
    *getRoleList({ payload }, { call, put }) {
      const result = yield call(getRole, payload);
      if (result.code === 20000) {
        const roleList = result.data ? result.data : [];
        yield put({ type: 'save', payload: { roleList } });
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
  },
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

  subscriptions: {
  },
};

