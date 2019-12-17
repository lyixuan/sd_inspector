import React, { Component } from 'react';
import { connect } from 'dva';
import MainPage from './mainPage/index';
import ScoreIncome from './component2/ScoreIncome';
import ImNps from './component2/ImNps';

@connect(({ xdWorkModal }) => ({
  xdWorkModal,
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
      });
  }

  // 获取nps接口
  getNpsData = date => {
    this.props.dispatch({
      type: 'xdWorkModal/getNpsData',
      payload: { params: { startTime: date.startDate, endTime: date.endDate } },
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
      </>
    );
  }
}

export default IndexPage;
