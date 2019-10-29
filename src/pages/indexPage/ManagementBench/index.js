import React from 'react';
import { connect } from 'dva';
import storage from '../../../utils/storage';
import styles from './style.less';
import ScoreContrast from './scoreContrast';
import Header from './header';
import IncomeCompare from './incomeCompare';
import ReactDOM from 'react-dom';
import IMPartLeft from './IMPartLeft';
import IMPartRight from './IMPartRight';
import NPSEvaluate from './NPSEvaluate';
@connect(({ xdManagementBench, xdWorkModal }) => ({
  xdManagementBench,
  userInfo: xdWorkModal.userInfo,
}))
class ManagementBench extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: storage.getItem('admin_user').userId,
      date: {
        startDate: null,
        kpiMonth: null,
        endDate: null,
      },
    };
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log(nextState, 'nextProps.date');
  //   if (nextProps.xdManagementBench.getCurrentDateRangeData.startDate) {
  //     return true;
  //   }
  // }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps, 'nextPropsnextProps');
    if (
      nextProps.xdManagementBench.getCurrentDateRangeData &&
      nextProps.xdManagementBench.getCurrentDateRangeData.startDate !== this.state.date.startDate
    ) {
      this.setState({ date: nextProps.xdManagementBench.getCurrentDateRangeData });
    }
  }
  componentDidMount() {
    this.props
      .dispatch({
        type: 'xdManagementBench/getCurrentDateRange',
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
      })
      .then(res => {
        this.getReasonListData();
      });
    // this.getReasonListData()
  }

  componentDidUpdate() {
    if (this.props.location) {
      const anchor = this.props.location.hash.replace('#', '');
      if (anchor) {
        const domElement = ReactDOM.findDOMNode(this.refs[anchor]);
        if (domElement) {
          domElement.scrollIntoView();
        }
      }
    }
  }
  getReasonListData() {
    console.log('userInfo77777', this.props.userInfo);
    // const params = {
    //   startTime: "2019-09-01",//this.state.startTime,
    //   endTime:"2019-09-26" ,//this.state.endTime,
    //   familyType: 0,
    //   groupType: this.getGroupMsg().groupType || 'group',
    //   orgId: this.getGroupMsg().groupId || this.state.allUserInfo.groupId,
    //   reasonTypeId: this.state.reasonTypeId
    // }
    // this.props.dispatch({
    //   type: 'xdCreditModal/reasonList',
    //   payload: { params }
    // });
    // this.getImDetail();
  }
  render() {
    const { date } = this.state;
    return (
      <div className={styles.workbench}>
        {date.startDate && <Header date={date} />}
        {date.startDate && <IncomeCompare date={date} />}
        <ScoreContrast ref="one" />
        <div className={styles.qualityAppel} ref="four">
          <IMPartLeft />
          <IMPartRight />
        </div>
        <NPSEvaluate ref="five" />
      </div>
    );
  }
}

export default ManagementBench;
