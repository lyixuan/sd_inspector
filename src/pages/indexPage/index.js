import React, { Component } from 'react';
import { connect } from 'dva';
import { Spin } from 'antd';
import MainPage from './mainPage/index';
import ScoreIncome from './component2/ScoreIncome';
import ImNps from './component2/ImNps';
import QualityAppeal from './component2/QualityAppeal';
import moment from 'moment/moment';

@connect(({ xdWorkModal, loading }) => ({
  xdWorkModal,
  loadingTime: loading.effects['xdWorkModal/getCurrentDateRange'],
  getCurrentDateRangeData: xdWorkModal.getCurrentDateRangeData,
}))
class IndexPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: {
        startDate: null,
        kpiMonth: null,
        endDate: null,
      },
    };
  }
  componentDidMount() {
    this.props
      .dispatch({
        type: 'xdWorkModal/getCurrentDateRange',
        payload: { params: { userType: 'family' } },
      })
      .then(res => {
        this.setState({ date: res });
        this.getData(res);
        this.getNpsData(res);
        this.getImNegativeData(res);
        this.getImPieData(res);
        this.getAppealData();
        this.getQualityData();
      });
  }

  // 获取nps接口
  getNpsData = () => {
    const { startTime, endTime } = this.props.getCurrentDateRangeData;
    if (startTime) {
      this.props.dispatch({
        type: 'xdWorkModal/getNpsData',
        payload: { params: { startTime, endTime } },
      });
    }
  };

  // 获取IM负面数据接口
  getImNegativeData = date => {
    const { startTime, endTime } = this.props.getCurrentDateRangeData;
    this.props.dispatch({
      type: 'xdWorkModal/getImNegativeData',
      payload: { params: { startTime, endTime } },
    });
  };

  // 获取IM饼图接口
  getImPieData = date => {
    const { startTime, endTime } = this.props.getCurrentDateRangeData;
    this.props.dispatch({
      type: 'xdWorkModal/getImPieData',
      payload: { params: { startTime, endTime } },
    });
  };

  // 学分申诉
  getAppealData = () => {
    const { startTime, endTime } = this.props.getCurrentDateRangeData;
    this.props.dispatch({
      type: 'xdWorkModal/getAppealData',
      payload: { params: { startTime, endTime } },
    });
  };

  // 质检
  getQualityData = () => {
    const { startTime, endTime } = this.props.getCurrentDateRangeData;
    this.props.dispatch({
      type: 'xdWorkModal/getQualityData',
      payload: { params: { startTime, endTime } },
    });
  };

  getData = date => {
    this.props.dispatch({
      type: 'xdWorkModal/getWorkbenchScore',
      payload: {
        params: {
          startTime: moment(new Date(date.startDate)).format('YYYY-MM-DD'),
          endTime: moment(new Date(date.endDate)).format('YYYY-MM-DD'),
        },
      },
    });
  };

  render() {
    const { date } = this.state;
    const { loadingTime } = this.props;
    const { WorkbenchScore, WorkbenchIncome, WorkbenchNpsData } = this.props.xdWorkModal;
    return (
      <Spin spinning={loadingTime}>
        <ScoreIncome
          date={date}
          WorkbenchScore={WorkbenchScore}
          WorkbenchIncome={WorkbenchIncome}
        />
        <ImNps WorkbenchNpsData={WorkbenchNpsData} />
        <QualityAppeal WorkbenchNpsData={WorkbenchNpsData} />
      </Spin>
    );
  }
}

export default IndexPage;
