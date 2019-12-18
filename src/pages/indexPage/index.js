import React, { Component } from 'react';
import { connect } from 'dva';
import MainPage from './mainPage/index';
import ScoreIncome from './component2/ScoreIncome';
import ImNps from './component2/ImNps';
import QualityAppeal from './component2/QualityAppeal';

@connect(({ xdWorkModal }) => ({
  xdWorkModal,
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
      });
  }

  // 获取nps接口
  getNpsData = date => {
    const { startTime, endTime } = this.props.getCurrentDateRangeData;
    this.props.dispatch({
      type: 'xdWorkModal/getNpsData',
      payload: { params: { startTime, endTime } },
    });
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

  getData = date => {
    this.props.dispatch({
      type: 'xdWorkModal/getWorkbenchScore',
      payload: { params: { startTime: date.startDate, endTime: date.endDate } },
    });
  };

  render() {
    const { date } = this.state;
    const { WorkbenchScore, IncomeData, WorkbenchNpsData } = this.props.xdWorkModal;
    return (
      <>
        <ScoreIncome date={date} WorkbenchScore={WorkbenchScore} IncomeData={IncomeData} />
        <ImNps WorkbenchNpsData={WorkbenchNpsData} />
        <QualityAppeal WorkbenchNpsData={WorkbenchNpsData} />
      </>
    );
  }
}

export default IndexPage;
