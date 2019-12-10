import {
  getUserInfo,
  getUserOrgList,
  getDimensionList,
  getDimensionDetail,
  attendanceDeail,
  getKpiDateRange,
  getAppealType,
  reasonList,
  imDetailList,
  queryAppealDataPage
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
    attendanceDeatils: {
      data: [],
      dimensionList: []
    },
    kpiDateRange: {},
    imDetailData: {},
    imDetailList: [],
    appealDatas: {} // 日趋图数据
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
    *getUserOrgList({ payload, callback }, { call, put }) {
      const params = payload.params
      const result = yield call(getUserOrgList, params);
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
          yield put({ type: 'saveLevel', payload: { dimensionLevel: res.dimensionList } });
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

    // 重播直播维度详情
    *getAttendanceDeail({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(attendanceDeail, params);
      if (result.code === 20000) {
        const res = result.data;
        if (res && res !== null) yield put({ type: 'save', payload: { attendanceDeatils: res } });
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
    //  家族学分对比柱状图部分的接口
    *queryAppealDataPage({ payload, callback }, { call, put }) {
      yield put({ type: 'save', payload: { appealDatas: [] } });
      const result = yield call(queryAppealDataPage, payload.params);
      if (result.code === 20000 && result.data) {
        yield put({ type: 'save', payload: { appealDatas: result.data } });
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
    },
    saveLevel(state, { payload }) {
      const dimensionLevel = {};
      getLevel(payload.dimensionLevel, dimensionLevel);
      return { ...state, dimensionLevel };
    },
  },
  subscriptions: {},
};
function getLevel(arr = [], init = {}, l = 1, ) {
  arr.map(item => {
    init[item.id + ''] = l;
    if (item.children && item.children.length > 0) {
      getLevel(item.children, init, l + 1);
    }
  })
}
