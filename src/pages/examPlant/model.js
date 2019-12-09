import { message } from 'antd';
import moment from 'moment';
import { initTimeData } from '@/pages/ko/utils/utils';
import { msgF } from '@/utils/utils';
import {
  getExamList,
  getProvinceData
} from './services';

const tHead = ['省份', '在服学员', '新生注册', '新生报考', '老生报考', '新生确认', '老生确认', '实践报考', '缴费', '补报',]
export default {
  namespace: 'examPlant',

  state: {
    yearMonthList: [],
    selectVal: null,
    provinceExamList: [],
    systemTime: '',
    startTime: moment('2019-09-01'),
    endTime: moment(new Date().getTime())
  },

  effects: {
    *updateDate({ payload }, { call, put }) {
      const [startTime, endTime] = initTimeData(payload.params);
      yield put({
        type: 'saveTime',
        payload: { startTime, endTime },
      })
    },
    *getExamList({ }, { call, put }) {
      const response = yield call(getExamList);
      const res = yield call(getProvinceData, { id: response.data[0].id })
      if (response && response.code === 20000) {
        yield put({
          type: 'save',
          payload: { yearMonthList: response.data, selectVal: response.data[0].id },
        });
        yield put({
          type: 'saveData',
          payload: { provinceExamList: res.data.list, systemTime: res.data.systemTime },
        });
      } else if (response) {
        message.error(response.msg)
      }
    },
    *getProvinceData({ payload }, { call, put }) {
      const params = payload.params
      const response = yield call(getProvinceData, params);
      if (response && response.code === 20000) {
        yield put({
          type: 'saveData',
          payload: { provinceExamList: response.data.list, systemTime: response.data.systemTime },
        });
      } else if (response) {
        message.error(response.msg)
      }
    },

  },

  // const tHead = ['省份', '在服学员', '新生注册', '新生报考', '老生报考', '新生确认', '老生确认', '实践报考', '缴费', '补考',]

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
    saveTime(state, { payload }) {
      const value = {
        startTime: moment(payload.startTime),
        endTime: moment(payload.endTime)
      }
      return { ...state, ...value };
    },
    saveData(state, { payload }) {
      let data = payload.provinceExamList
      data.map(item => {
        if (item.register) {
          item.register.name = tHead[2]
          item.register.index = 0
        }
        if (item.enroll) {
          item.enroll.name = tHead[3]
          item.enroll.index = 1
        }
        if (item.oldEnroll) {
          item.oldEnroll.name = tHead[4]
          item.oldEnroll.index = 2
        }
        if (item.scene) {
          item.scene.name = tHead[5]
          item.scene.index = 3
        }
        if (item.oldScene) {
          item.oldScene.name = tHead[6]
          item.oldScene.index = 4
        }
        if (item.practice) {
          item.practice.name = tHead[7]
          item.practice.index = 5
        }
        if (item.pay) {
          item.pay.name = tHead[8]
          item.pay.index = 6
        }
        if (item.repairEnroll) {
          item.repairEnroll.name = tHead[9]
          item.repairEnroll.index = 7
        }
      })
      return { ...state, ...{ provinceExamList: data, systemTime: payload.systemTime } };

    },
  },
  subscriptions: {},
};
