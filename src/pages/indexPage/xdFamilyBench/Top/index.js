import React from 'react';
// import styles from './styles.less';
import { connect } from 'dva';
import Income from './block/compare';
import Top from './block/top';
import Surge from './block/surge';

@connect(({ xdFamilyModal, xdWorkModal }) => ({
  xdFamilyModal,
  userInfo: xdWorkModal.userInfo,
}))
class IncomeCompare extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: {
        startDate: null,
        kpiMonth: null,
        endDate: null,
        reasonTypeId: 0,
      },
    };
  }
  componentDidMount() {
    this.props
      .dispatch({
        type: 'xdFamilyModal/getCurrentDateRange',
        payload: { params: { userType: 'family' } },
      })
      .then(res => {
        this.setState({
          date: {
            startDate: res.startDate,
            endDate: res.endDate,
            kpiMonth: res.kpiMonth,
          },
        });
      });
  }

  render() {
    const { userInfo } = this.props;
    const { date } = this.state;
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {date && date.startDate && <Surge date={date} userInfo={userInfo} />}
        {date && date.startDate && <Top date={date} userInfo={userInfo} />}
      </div>
    );
  }
}

export default IncomeCompare;
