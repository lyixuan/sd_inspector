import {
  getUserInfo,
  getUserOrgList,
  getDimensionList,
  getDimensionDetail,
  getKpiDateRange,
  getAppealType,
  reasonList,
  imDetailList,
} from './services';
import { message } from 'antd/lib/index';
import { msgF } from "@/utils/utils";

export default {
  namespace: 'xdCreditModal',
  state: {
    dimensionData: {
      data: [],
      dimensionList: []
    },
    dimensionDetails: {
      data: [],
      dimensionList: []
    },
    kpiDateRange: {},
    imDetailData: {},
    imDetailList: [],
  },


  effects: {
    *imDetailList({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(imDetailList, params);
      if (result.code === 20000) {
        yield put({ type: 'save', payload: { imDetailList: result } });
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    *reasonList({ payload }, { call, put }) {
      yield put({ type: 'save', payload: { imDetailList: [] } });
      const params = payload.params;
      const result = yield call(reasonList, params);
      if (result.code === 20000) {
        yield put({ type: 'saveTable', payload: { imDetailData: result.data } });
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    *getUserInfo({ callback }, { call }) {
      const result = yield call(getUserInfo);
      if (result.code === 20000 && result.data) {
        if (callback && typeof callback === 'function') {
          callback(result.data);
        }
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    *getUserOrgList({ callback }, { call, put }) {
      const result = yield call(getUserOrgList);
      if (result.code === 20000) {
        const res = result.data;
        if (callback && typeof callback === 'function') {
          callback(res);
        }
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    *getDimensionList({ payload, callback }, { call, put }) {
      const params = payload.params;
      const result = yield call(getDimensionList, params);
      if (result.code === 20000) {
        const res = result.data;
        if (res && res !== null) {
          yield put({ type: 'save', payload: { dimensionData: res } });
          if (callback && typeof callback === 'function') {
            callback(res);
          }
        }
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    *getDimensionDetail({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(getDimensionDetail, params);
      if (result.code === 20000) {
        const res = result.data;
        if (res && res !== null) yield put({ type: 'save', payload: { dimensionDetails: res } });
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    *getKpiDateRange({ callback }, { call, put }) {
      const result = yield call(getKpiDateRange);
      if (result.code === 20000) {
        const res = result.data;
        if (res && res !== null) {
          yield put({ type: 'save', payload: { kpiDateRange: res } });
          if (callback && typeof callback === 'function') {
            callback(res);
          }
        }
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    *getAppealType({ payload, callback }, { call, }) {
      const result = yield call(getAppealType, payload.params);
      if (result.code === 20000) {
        const res = result.data;
        if (callback && typeof callback === 'function') {
          callback(res);
        }
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
    saveTable(state, { payload }) {
      let data = payload.imDetailData
      if (!data.reasonTypeList) {
        data.dataList.length > 0 && data.dataList.map(item => {
          item.values.push(item.unClassifyValue)
          item.valueCounts.push(item.unClassifyCount)
        })
        data.reasonTypeList = [{
          expand: true,
          typeId: 0,
          typeName: '所有分类'
        }]
        if (data.titleList) {
          data.titleList = [...data.titleList, {
            expand: false,
            typeId: -1,
            typeName: "未分类数据"
          }]
        }

      } else {
        data.reasonTypeList = [{
          expand: true,
          typeId: 0,
          typeName: '所有分类'
        }, ...data.reasonTypeList]
      }
      return { ...state, ...{ imDetailData: data } };
    }
  },
  subscriptions: {},
};
