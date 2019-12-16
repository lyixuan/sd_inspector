import React from 'react';
import { connect } from 'dva';
import styles from './style.less';
import IM from './components/im/index';
import moment from 'moment';

@connect(({ xdWorkModal }) => ({
  userInfo: xdWorkModal.userInfo,
  getCurrentDateRangeData: xdWorkModal.getCurrentDateRangeData,
}))
class MainPage extends React.Component {
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
    // this.props.userInfo.userType
    if (this.props.userInfo.userType) {
      this.props.dispatch({
        type: 'xdWorkModal/getCurrentDateRange',
        payload: { params: { userType: 'family' } },
      });
    }
  }

  render() {
    const { getCurrentDateRangeData } = this.props;
    // date 日期  this.props.userInfo
    return (
      <div className={styles.mainPage}>
        {/* <IM /> */}
        111
      </div>
    );
  }
}

export default MainPage;
