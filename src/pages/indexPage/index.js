import React, { Component } from 'react';
import { connect } from 'dva';
import MainPage from './mainPage/index';
import ScoreIncome  from './component2/ScoreIncome';

@connect(({ xdWorkModal }) => ({
  userInfo: xdWorkModal.userInfo,
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
        payload: { params: { userType: 'family' }},
      }).then(res => {
        this.setState({ date: res });
        this.getData(res)
      });
  }

  getData=(date)=>{

  };

  render() {
    const { date } = this.state;
    const { WorkbenchScore,IncomeData } =  this.props.xdWorkModal;
    return (
      <>
        <MainPage />
        <ScoreIncome date={date} WorkbenchScore={WorkbenchScore} IncomeData={IncomeData}/>
      </>
    );
  }
}

export default IndexPage;
