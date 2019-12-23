import {
  getNpsStarOpinion,
  getNpsAutonomousEvaluation,
  compareCollegeList,
  getCurrentDateRange,
  getOrgMapTree,
  getFamilyType,
  getUserInfo,
  getOrgMapList,
  getIncomeCollegeList,
  getNpsData,
  getNPSPaiData,
} from './services';
import { message } from 'antd/lib';
import { msgF } from '@/utils/utils';
import moment from 'moment';

export default {
  namespace: 'xdOperation',
  state: {
    npsParams: {}, //nps部分的数据
    npsList: [],
    compareCollegeListData: [],
    getCurrentDateRangeData: {},
    getCurrentDateRangeData1: {},
    orgList: [],
    imDetailData: [],
    userInfo: {}, // 全局值
    orgList: [],
    // globalLevelList: [],
    globalCollegeList: [],
    globalQVisible: false, // 问卷调查是否显示
    xdOperationNpsData: {},
    xdOperationNpsPaiData: {},
  },
  effects: {
    //  管理层工作台的接口
    *getNpsStarOpinion({ payload, callback }, { call, put }) {
      const result = yield call(getNpsStarOpinion, payload.params);
      if (result.code === 20000 && result.data) {
        yield put({ type: 'save', payload: { npsParams: result.data } });
        if (callback && typeof callback === 'function') {
          callback(result.data);
        }
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    //NPS自主评价所有的接口
    *getNpsAutonomousEvaluation({ payload, callback }, { call, put }) {
      const {
        collegeId,
        familyId,
        groupId,
        star,
        cycle,
        pageNum,
        pageSize,
        npsList: oldLists,
        change,
        endTime,
        startTime,
      } = payload.params;

      const params = {
        collegeId,
        familyId,
        groupId,
        star,
        cycle,
        pageSize,
        pageNum,
        startTime,
        endTime,
      };
      const result = yield call(getNpsAutonomousEvaluation, params);
      if (result.code === 20000) {
        const npsParams = result.data || {};

        let npsList = [];
        if (change) {
          npsList = [].concat(npsParams.npsStarOpinionDtoListMap.data);
        } else {
          if (Number(pageNum) !== 1) {
            npsList = oldLists.concat(npsParams.npsStarOpinionDtoListMap.data);
          } else {
            npsList = [].concat(npsParams.npsStarOpinionDtoListMap.data);
          }
        }

        yield put({ type: 'save', payload: { npsParams, npsList } });
        if (callback && typeof callback === 'function') {
          callback(result.data, npsList);
        }
      } else {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    //  获取组织架构
    *getOrgMapTree({ payload, callback }, { call, put }) {
      const result = yield call(getOrgMapTree);
      if (result.code === 20000 && result.data) {
        if (callback && typeof callback === 'function') {
          callback(result.data);
        }
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },

    //  获取学院家族性质
    *getFamilyType({ payload, callback }, { call, put }) {
      const result = yield call(getFamilyType);
      if (result.code === 20000 && result.data) {
        if (callback && typeof callback === 'function') {
          callback(result.data);
        }
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    // 获取学分
    // *getCountCreditAvgScore({ payload, callback }, { call, put }) {
    //   const params = payload.params;
    //   const result = yield call(countCreditAvgScore, params);
    //   if (result.code === 20000) {
    //     return result.data;
    //   } else if (result) {
    //     message.error(msgF(result.msg, result.msgDetail));
    //   }
    // },
    // 获取指标
    // *getCountByDate({ payload, callback }, { call, put }) {
    //   const params = payload.params;
    //   const result = yield call(countByDate, params);
    //   if (result.code === 20000) {
    //     return result.data;
    //   } else if (result) {
    //     message.error(msgF(result.msg, result.msgDetail));
    //   }
    // },
    // 热销产品包列表
    // *getPackageRankList({ payload, callback }, { call, put }) {
    //   const params = payload.params;
    //   const result = yield call(packageRankList, params);
    //   if (result.code === 20000) {
    //     return result.data;
    //   } else if (result) {
    //     message.error(msgF(result.msg, result.msgDetail));
    //   }
    // },

    // 获取绩效周期
    *getCurrentDateRange({ payload, callback }, { call, put }) {
      const params = payload.params;
      const result = yield call(getCurrentDateRange, params);
      if (result.code === 20000) {
        yield put({
          type: 'save',
          payload: {
            getCurrentDateRangeData1: {
              startTime: moment(result.data.startDate).format('YYYY-MM-DD'),
              endTime: moment(result.data.endDate).format('YYYY-MM-DD'),
            },
          },
          payload: {
            getCurrentDateRangeData: result.data,
          },
        });
        return result.data;
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    // 创收学院对比列表
    *getCompareCollegeList({ payload, callback }, { call, put }) {
      const params = payload.params;
      const result = yield call(compareCollegeList, params);
      if (result.code === 20000) {
        yield put({
          type: 'save',
          payload: {
            compareCollegeListData: result.data,
          },
        });
        return result.data;
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },

    *getUserInfo({ callback }, { call, put }) {
      const result = yield call(getUserInfo);
      if (result.code === 20000 && result.data) {
        yield put({ type: 'save', payload: { userInfo: result.data } });
        if (callback && typeof callback === 'function') {
          callback(result.data);
        }
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    // 组织列表
    *getOrgMapList({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(getOrgMapList, params);
      const orgList = result.data || [];
      if (result.code === 20000) {
        yield put({ type: 'saveMap', payload: { orgList } });
      } else {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    // 家族-学院列表
    *getIncomeCollegeList(_, { call, put }) {
      const result = yield call(getIncomeCollegeList);
      if (result.code === 20000) {
        yield put({ type: 'save', payload: { globalCollegeList: result.data } });
      } else if (result && result.code !== 50000) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },

    // 获取Nps数据
    *getNpsData({ payload, callback }, { call, put }) {
      const result = yield call(getNpsData, payload.params);
      if (result.code === 20000 && result.data) {
        yield put({ type: 'save', payload: { xdOperationNpsData: result.data } });
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },

    // 获取Nps数据
    *getNPSPaiData({ payload, callback }, { call, put }) {
      const result = yield call(getNPSPaiData, payload.params);
      if (result.code === 20000 && result.data) {
        yield put({ type: 'save', payload: { xdOperationNpsPaiData: result.data } });
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
      let data = payload.imDetailData;
      if (!data.reasonTypeList) {
        data.dataList.map(item => {
          item.values.push(item.unClassifyValue);
          item.valueCounts.push(item.unClassifyCount);
        });
        data.reasonTypeList = [
          {
            expand: true,
            typeId: 0,
            typeName: '所有分类',
          },
        ];
        if (data.titleList instanceof Array) {
          data.titleList = [
            ...data.titleList,
            {
              expand: false,
              typeId: -1,
              typeName: '未分类数据',
            },
          ];
        } else {
          data.titleList = [
            {
              expand: false,
              typeId: -1,
              typeName: '未分类数据',
            },
          ];
        }
      } else {
        data.reasonTypeList = [
          {
            expand: true,
            typeId: 0,
            typeName: '所有分类',
          },
          ...data.reasonTypeList,
        ];
      }
      return { ...state, ...{ imDetailData: data } };
    },
    saveMap(state, { payload }) {
      const orgListTreeData = toTreeData(payload.orgList);
      return { ...state, orgList: payload.orgList, orgListTreeData };
    },
  },
  subscriptions: {},
};
function toTreeData(orgList) {
  const treeData = [];
  orgList.forEach(v => {
    const o = { title: v.name, value: `a-${v.id}`, key: v.id, selectable: false, lv: 1 };
    if (v.nodeList.length > 0) {
      o.children = [];
      v.nodeList.forEach(v1 => {
        const o1 = {
          title: v1.name,
          value: `b-${v1.id}`,
          key: v1.id + 1000,
          selectable: false,
          lv: 2,
        };
        o.children.push(o1);
        if (v1.nodeList.length > 0) {
          o1.children = [];
          v1.nodeList.forEach(v2 => {
            const o2 = { title: v2.name, value: `c-${v2.id}`, key: v2.id + 100000, lv: 3 };
            o1.children.push(o2);
          });
        }
      });
    }
    treeData.push(o);
  });
  return treeData;
}
