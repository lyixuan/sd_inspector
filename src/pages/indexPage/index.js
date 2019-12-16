import React, { Component } from 'react';
import { connect } from 'dva';
import MainPage from './mainPage/index';

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
    this.props.dispatch({
      type: 'xdWorkModal/getUserInfo',
      callback: res => {
        this.props
          .dispatch({
            type: 'xdWorkModal/getCurrentDateRange',
            // payload: { params: { userType: 'family' } },
          })
          .then(res => {
            this.setState({ date: res });
          });
      },
    });
  }
  render() {
    const { date } = this.state;
    console.log(date, 'date');
    return (
      <>
        <MainPage />
      </>
    );
  }
}

export default IndexPage;
