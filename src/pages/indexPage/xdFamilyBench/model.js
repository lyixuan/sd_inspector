import {
  getCurrentIncomeGroup,
  getCurrentIncomeClass,
  getCurrentIncomeTarget,
  getOrgMapList,
  getFamilyRecord,
  getFamilyQuality,
  scoreStatistics,
  scoreDetail,
  incomeCollegeRankList,
  incomeCompanyRankList,
  collegeRankList,
  companyRankList,
  achievementList,
  familyAchievement,
  qualityChargeCount,
  // getFamilyScorePk,
  // getFamilyRankList,
  // getGroupPkList,
  getIncomeFamilyList,
  getFamilyList,
  // getCollegeList,
  // myFamilyGroupList,
  // getIncomeCollegeList,
  getIncomeFamilyGroupPk,
  // groupPkList,
  getIncomeGroupList,
  // 新增加的
  getNpsStarOpinion,
  getNpsAutonomousEvaluation,
  compareCollegeList,
  getCurrentDateRange,
  getHotList,
  packageRankList,
  getOrgMapTree,
  risePackageRankList,
  getImReverseSideData,
  queryAppealDataPage,
  getFamilyType,
  reasonList,
  countCreditAvgScore,
  countByDate,
  // end
} from './services';
import { message } from 'antd/lib/index';
import { msgF, thousandsFormat } from '@/utils/utils';
import { fillDataSource } from '@/pages/indexPage/components/utils/utils';
import moment from 'moment';

export default {
  namespace: 'xdFamilyModal',
  state: {
    familyKpiTimes: {}, // 时间
    orgOptions: [
      {
        id: 1,
        name: '组织',
      },
      {
        id: 2,
        name: '人均在服学员',
      },
    ], // 学分抽屉选择条件
    orgSecondOptions: [
      {
        id: 'group',
        name: '集团',
      },
      {
        id: 'college',
        name: '本学院',
      },
      {
        id: 'family',
        name: '本家族',
      },
    ], // 学分抽屉选择条件
    // orgList: [], // 保存组织原始结构
    // orgListTreeData: [], // 保存组织处理成treeData需要的结构
    familyIncome: [], // 创收
    familyAppeal: {}, // 申诉
    familyQuality: [], // 质检
    // familyGroupPkList: {},
    familyKpiInfo: {},
    chargeCount: {},
    familyScorePk: {}, // 创收对比家族
    groupScorePk: {}, // 学分对比小组
    familyIncomeList: {}, // 创收对比家族
    familyIncomeDrawer: [],
    groupIncomeList: {}, // 创收对比小组
    groupIncomeDrawer: [],
    // 新增加部分
    npsParams: {}, //nps部分的数据
    compareCollegeListData: [],
    getCurrentDateRangeData: null,
    orgList: [],

    npsParams: {}, //nps部分的数据
    compareCollegeListData: [],
    getCurrentDateRangeData: null,
    orgList: [],
    imDetailData: [],
    globalDateRange: {}, // 时间 --
    packageRankList: [],

    // end
  },

  effects: {
    // 家族长工作台-绩效详情
    *familyAchievement({ payload, callback }, { call, put }) {
      const params = payload.params;
      const result = yield call(familyAchievement);
      const result2 = yield call(qualityChargeCount, params);
      if (result.code === 20000) {
        const params = {
          startTime: moment(result.data.kpiStartDate).format('YYYY-MM-DD'),
          endTime: moment(result.data.kpiEndDate).format('YYYY-MM-DD'),
        };
        yield put({
          type: 'save',
          payload: {
            chargeCount: result2.data,
            familyKpiInfo: result.data,
            familyKpiTimes: params,
          },
        });
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    // 本期预估绩效 - 质检扣款金额统计
    // *qualityChargeCount({ payload, callback }, { call }) {
    //   const params = payload.params;
    //   const result = yield call(qualityChargeCount, params);
    //   if (result.code === 20000) {
    //     if (callback && typeof callback === 'function') {
    //       callback(result.data);
    //     }
    //   } else if (result) {
    //     message.error(msgF(result.msg, result.msgDetail));
    //   }
    // },
    // 本期学分—集团学分排名
    *companyRankList({ payload, callback }, { call }) {
      const params = payload.params;
      const result = yield call(companyRankList, params);
      if (result.code === 20000) {
        if (callback && typeof callback === 'function') {
          callback(result.data);
        }
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    // 本期学分—本学院学分排名
    *collegeRankList({ payload, callback }, { call }) {
      const params = payload.params;
      const result = yield call(collegeRankList, params);
      if (result.code === 20000) {
        if (callback && typeof callback === 'function') {
          callback(result.data);
        }
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    // 本期绩效—排行榜
    *achievementList({ payload, callback }, { call }) {
      const params = payload.params;
      const result = yield call(achievementList, params);
      if (result.code === 20000) {
        if (callback && typeof callback === 'function') {
          callback(result.data);
        }
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    // 本期创收-集团排名
    *incomeCompanyRankList({ payload, callback }, { call }) {
      const params = payload.params;
      const result = yield call(incomeCompanyRankList, params);
      if (result.code === 20000) {
        if (callback && typeof callback === 'function') {
          callback(result.data);
        }
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    // 本学院创收排名
    *incomeCollegeRankList({ payload, callback }, { call }) {
      const params = payload.params;
      const result = yield call(incomeCollegeRankList, params);
      if (result.code === 20000) {
        if (callback && typeof callback === 'function') {
          callback(result.data);
        }
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    // 本期学分明细
    *scoreDetail({ payload, callback }, { call }) {
      const params = payload.params;
      const result = yield call(scoreDetail, params);
      if (result.code === 20000) {
        if (callback && typeof callback === 'function') {
          callback(result.data);
        }
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    // 本期学分汇总
    *scoreStatistics({ payload, callback }, { call }) {
      const params = payload.params;
      const result = yield call(scoreStatistics, params);
      if (result.code === 20000) {
        if (callback && typeof callback === 'function') {
          callback(result.data);
        }
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    // ====================家族
    // 创收明细
    *getCurrentIncomeTarget({ callback }, { call }) {
      const result = yield call(getCurrentIncomeTarget);
      if (result.code === 20000) {
        if (callback && typeof callback === 'function') {
          callback(result.data);
        }
      } else if (result && result.code !== 50000) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    *getCurrentIncomeGroup({ callback }, { call }) {
      const result = yield call(getCurrentIncomeGroup);
      if (result.code === 20000) {
        result.data && result.data.map(item => (item.classCount = item.groupCount));
        if (callback && typeof callback === 'function') {
          callback(result.data);
        }
      } else if (result && result.code !== 50000) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    *getCurrentIncomeClass({ callback }, { call }) {
      const result = yield call(getCurrentIncomeClass);
      if (result.code === 20000) {
        if (callback && typeof callback === 'function') {
          callback(result.data);
        }
      } else if (result && result.code !== 50000) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    // 组织列表
    // *getOrgMapList({ payload }, { call, put }) {
    //   const params = payload.params;
    //   const result = yield call(getOrgMapList, params);
    //   const orgList = result.data || [];

    //   if (result.code === 20000) {
    //     yield put({ type: 'saveMap', payload: { orgList } });
    //   } else {
    //     message.error(msgF(result.msg, result.msgDetail));
    //   }
    // },
    // 本期申诉
    *getFamilyRecord({ payload }, { call, put }) {
      const result = yield call(getFamilyRecord, payload.params);
      if (result.code === 20000) {
        const familyAppeal = result.data;
        yield put({ type: 'save', payload: { familyAppeal } });
      } else if (result && result.code !== 50000) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    // 本期质检 - 质检统计
    *getFamilyQuality({ payload }, { call, put }) {
      const result = yield call(getFamilyQuality, payload.params);
      if (result.code === 20000) {
        const familyQuality = result.data;
        yield put({ type: 'save', payload: { familyQuality } });
      } else if (result && result.code !== 50000) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    //  IM负面数据对比
    *getImReverseSideData({ payload, callback }, { call, put }) {
      const result = yield call(getImReverseSideData, payload.params);
      if (result.code === 20000 && result.data) {
        if (callback && typeof callback === 'function') {
          callback(result.data);
        }
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    //  家族学分对比柱状图部分的接口
    *queryAppealDataPage({ payload, callback }, { call, put }) {
      const result = yield call(queryAppealDataPage, payload.params);
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
    *getCountCreditAvgScore({ payload, callback }, { call, put }) {
      const params = payload.params;
      const result = yield call(countCreditAvgScore, params);
      if (result.code === 20000) {
        return result.data;
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    // 获取指标
    *getCountByDate({ payload, callback }, { call, put }) {
      const params = payload.params;
      const result = yield call(countByDate, params);
      if (result.code === 20000) {
        return result.data;
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    // 热销产品包列表
    *getPackageRankList({ payload, callback }, { call, put }) {
      const params = payload.params;
      const result = yield call(packageRankList, params);
      if (result.code === 20000) {
        return result.data;
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },

    //  家族学分对比
    // *getFamilyScorePk({ payload, callback }, { call, put }) {
    //   const result = yield call(getFamilyScorePk, payload.params);
    //   if (result.code === 20000) {
    //     if (callback && typeof callback === 'function') {
    //       callback(result.data);
    //     }
    //     yield put({ type: 'saveScore', payload: { data: result.data, key: 'familyScorePk' } });
    //   } else if (result && result.code !== 50000) {
    //     message.error(msgF(result.msg, result.msgDetail));
    //   }
    // },
    //  家族学分对比右侧家族学分排名
    // *getFamilyRankList({ payload, callback }, { call, put }) {
    //   const result = yield call(getFamilyRankList, payload.params);
    //   if (result.code === 20000) {
    //     if (callback && typeof callback === 'function') {
    //       callback(result.data);
    //     }
    //   } else if (result && result.code !== 50000) {
    //     message.error(msgF(result.msg, result.msgDetail));
    //   }
    // },
    //  家族学分对比的学院列表
    // *getCollegeList({ payload, callback }, { call, put }) {
    //   const result = yield call(getCollegeList, payload.params);
    //   if (result.code === 20000) {
    //     if (callback && typeof callback === 'function') {
    //       callback(result.data);
    //     }
    //   } else if (result && result.code !== 50000) {
    //     message.error(msgF(result.msg, result.msgDetail));
    //   }
    // },
    //  小组学分对比
    // *getGroupPkList({ payload, callback }, { call, put }) {
    //   const result = yield call(getGroupPkList, payload.params);
    //   const familyGroupPkList = result.data;
    //   if (result.code === 20000) {
    //     yield put({ type: 'save', payload: { familyGroupPkList } });
    //     if (callback && typeof callback === 'function') {
    //       callback(result.data.groupList);
    //     }
    //   } else if (result && result.code !== 50000) {
    //     message.error(msgF(result.msg, result.msgDetail));
    //   }
    // },
    //  小组学分设置对比下拉
    // *myFamilyGroupList({ payload, callback }, { call, put }) {
    //   const result = yield call(myFamilyGroupList, payload.params);
    //   if (result.code === 20000) {
    //     if (callback && typeof callback === 'function') {
    //       callback(result.data);
    //     }
    //   } else if (result && result.code !== 50000) {
    //     message.error(msgF(result.msg, result.msgDetail));
    //   }
    // },
    //  家族创收对比
    *getIncomeFamilyList({ payload }, { call, put }) {
      const result = yield call(getIncomeFamilyList, payload.params);
      if (result.code === 20000) {
        yield put({ type: 'saveMax', payload: { data: result.data, key: 'familyIncomeList' } });
      } else if (result && result.code !== 50000) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    // 家族创收对比右侧的家族绩效列表
    *getFamilyList({ payload, callback }, { call, put }) {
      const result = yield call(getFamilyList, payload.params);
      if (result.code === 20000) {
        yield put({ type: 'save', payload: { familyIncomeDrawer: result.data } });
      } else if (result && result.code !== 50000) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    // 家族创收对比右侧的学院列表
    // *getIncomeCollegeList({ callback }, { call }) {
    //   const result = yield call(getIncomeCollegeList);
    //   if (result.code === 20000) {
    //     if (callback && typeof callback === 'function') {
    //       callback(result.data);
    //     }
    //   } else if (result && result.code !== 50000) {
    //     message.error(msgF(result.msg, result.msgDetail));
    //   }
    // },
    // 家族创收对比-小组创收对比
    *getIncomeFamilyGroupPk({ payload, callback }, { call, put }) {
      const result = yield call(getIncomeFamilyGroupPk, payload.params);
      if (result.code === 20000) {
        yield put({ type: 'saveMax', payload: { data: result.data, key: 'groupIncomeList' } });
      } else if (result && result.code !== 50000) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    // 小组学分对比
    // *groupPkList({ payload, callback }, { call, put }) {
    //   const params = payload.params;
    //   const result = yield call(groupPkList, params);
    //   if (result.code === 20000) {
    //     if (callback && typeof callback === 'function') {
    //       callback(result.data);
    //     }
    //     yield put({ type: 'saveScore', payload: { data: result.data, key: 'groupScorePk' } });
    //   } else if (result) {
    //     message.error(msgF(result.msg, result.msgDetail));
    //   }
    // },
    // 家族创收对比右侧的家族绩效列表
    *getIncomeGroupList({ payload, callback }, { call, put }) {
      const result = yield call(getIncomeGroupList, payload.params);
      if (result.code === 20000) {
        yield put({ type: 'save', payload: { groupIncomeDrawer: result.data } });
      } else if (result && result.code !== 50000) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },

    // 新增加部分
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
      const result = yield call(getNpsAutonomousEvaluation, payload.params);
      if (result.code === 20000 && result.data) {
        yield put({ type: 'save', payload: { npsParams: result.data } });
        if (callback && typeof callback === 'function') {
          callback(result.data);
        }
      } else if (result) {
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

    // 获取绩效周期
    *getCurrentDateRange({ payload, callback }, { call, put }) {
      const params = payload.params;
      const result = yield call(getCurrentDateRange, params);
      if (result.code === 20000) {
        yield put({
          type: 'save',
          payload: {
            getCurrentDateRangeData: result.data,
          },
        });
        console.log(result.data,'result.data');
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
    // 获取热销榜单列表
    *getHotList({ payload, callback }, { call, put }) {
      const result = yield call(getHotList);
      if (result.code === 20000) {
        return result.data;
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },

    // 飙升产品包榜单
    *getRisePackageRankList({ payload, callback }, { call, put }) {
      const result = yield call(risePackageRankList);
      if (result.code === 20000) {
        return result.data;
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    *reasonList({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(reasonList, params);
      if (result.code === 20000) {
        yield put({ type: 'saveTable', payload: { imDetailData: result.data } });
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    // end
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

    // saveMap(state, { payload }) {
    //   const orgListTreeData = toTreeData(payload.orgList);
    //   return { ...state, orgList: payload.orgList, orgListTreeData };
    // },
    saveMax(state, { payload }) {
      const pkList = payload.data;
      const maxValue = {};
      for (var k in pkList[0]) {
        maxValue[k] = Math.max.apply(null, pkList.map(item => item[k]));
      }
      return { ...state, [payload.key]: { maxValue, pkList } };
    },
    // saveScore(state, { payload }) {
    //   const data = payload.data;
    //   data.dimensionList = fillDataSource(
    //     {
    //       ...state.familyKpiTimes,
    //       dataTrace: `家族长工作台/${payload.key === 'familyScorePk' ? '家族' : '小组'}学分/`,
    //     },
    //     data.dimensionList
    //   );
    //   return { ...state, [payload.key]: data };
    // },
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
