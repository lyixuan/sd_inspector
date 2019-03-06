import { message } from 'antd/lib/index';
import {provinceJson} from '@/utils/constants'
import { getOrgInfo, getExamDateRange } from './services';

export default {
  namespace: 'home',

  state: {
    orgList: [],
    provinceJson: [],
    dateRange: {},
  },

  effects: {
    *getOrgInfo({ payload }, { call, put }) {
      const result = yield call(getOrgInfo, {...payload});
      const orgList = result.data || [];
      if (result && result.code === 20000) {
        yield put({ type: 'saveData', payload: { orgList } });
      } else {
        message.error(result.msg);
      }
    },
    *getExamDateRange({ payload }, { call, put }) {
      const data = yield call(getExamDateRange, {...payload});
      if (data.code === 20000) {
        yield put({ type: 'save', payload: { dateRange: data.data } });
      } else {
        message.error(data.msg);
      }
    },
    *getProvinceJson({ payload }, { _, put }) {
      yield put({ type: 'saveData', payload: { provinceJson } });
    },
  },

  reducers: {
    saveData(state, {payload}) {
      const{orgList,provinceJson} = payload;
      if(orgList){
        orgList.unshift({name:'全部学院',id:null,sub:[]});
        orgList.map(item=>item.sub.unshift({name:'全部家族',id:null,sub:[]}));
      }
      if(provinceJson){
        provinceJson.unshift({name:'所有省份',code:''});
      }
      return { ...state, ...payload };
    },
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

  subscriptions: {
  },
};
