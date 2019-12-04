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
import moment from 'moment';
import Histogram from '@/pages/indexPage/components/scoreContrast';

@connect(({ xdManagementBench, xdWorkModal }) => ({
  xdManagementBench,
  globalDateRange: xdManagementBench.globalDateRange,
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
        reasonTypeId: 0,
      },
      loadingStatus: true,
    };
  }
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.xdManagementBench.getCurrentDateRangeData &&
      nextProps.xdManagementBench.getCurrentDateRangeData.startDate !== this.state.date.startDate
    ) {
      this.setState({ date: nextProps.xdManagementBench.getCurrentDateRangeData });
    }
  }

  getScreenWidth = ()=>{
    let screenRange = 'small_screen';
    const sWidth = window.screen.width;

    if(sWidth < 1440){
      // width:1030px;
      screenRange = 'small_screen';
    } else if (sWidth >= 1440) {
      // width:1190px;
      screenRange = 'middle_screen';
    }
    this.props.dispatch({
      type: 'xdManagementBench/checkScreen',
      payload: { screenRange },
    })
  };

  componentDidMount() {
    this.getScreenWidth();
    this.props
      .dispatch({
        type: 'xdManagementBench/getCurrentDateRange',
        payload: { params: { userType: 'family' } },
      })
      .then(res => {
        if (res) {
          this.setState({
            date: {
              startDate: res.startDate,
              endDate: res.endDate,
              kpiMonth: res.kpiMonth,
            },
          });
          this.getReasonListData(res.startDate, res.endDate);
        }
      });
    this._isMounted = true;
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
  reasonTypeClick = item => {
    this.setState(
      {
        loadingStatus: false,
        reasonTypeId: item.typeId,
      },
      () => {
        this.getReasonListData();
      }
    );
  };
  cellClick = (item, record, type) => {
    const { date } = this.state;
    let reasonTypeId = this.state.reasonTypeId;
    if (item) {
      reasonTypeId = item.typeId;
    } else if (type == 'total' && this.state.reasonTypeId == 0) {
      reasonTypeId = 0;
    }
    let params = {
      startTime: moment(date.startDate).format('YYYY-MM-DD'),
      endTime: moment(date.endDate).format('YYYY-MM-DD'),
      dementionId: 16,
      reasonTypeId: reasonTypeId,
      orgId: record.orgId,
      orgClick: this.orgClick,
      orgType: record.groupType,
    };
    window.open(`/inspector/xdCredit/index?params=${JSON.stringify(params)}`);
  };
  getReasonListData(startTime, endTime) {
    const { date } = this.state;
    const { userInfo = {} } = this.props;
    const params = {
      startTime: startTime ? moment(startTime).format('YYYY-MM-DD') : moment(date.startDate).format('YYYY-MM-DD'),
      endTime:endTime ? moment(endTime).format('YYYY-MM-DD') : moment(date.endDate).format('YYYY-MM-DD'),
      familyType: null,
      groupType: userInfo.userType,
      orgId: userInfo.collegeId,
      reasonTypeId: this.state.reasonTypeId,
    };

    // const params = {
    //   startTime: moment(date.startDate).format('YYYY-MM-DD'),
    //   endTime: moment(date.endDate).format('YYYY-MM-DD'),
    //   familyType: null,
    //   groupType: null,
    //   orgId: null,
    //   reasonTypeId: this.state.reasonTypeId,
    // };
    this.props.dispatch({
      type: 'xdManagementBench/reasonList',
      payload: { params },
    });
    // this.getImDetail();
  }

  componentWillUnmount = () => {
    this._isMounted = false;
  };

  render() {
    const { date } = this.state;
    const { userInfo = {}, globalDateRange } = this.props;
    return (
      <div className={styles.workbench}>
        {date.startDate && <Header date={date} />}
        {date.startDate && userInfo && <IncomeCompare date={date} userInfo={userInfo} />}
        {/* {date.startDate && userInfo && <ScoreContrast date={date} userInfo={userInfo} />} */}
        {globalDateRange.endTime && userInfo && <Histogram allTimes={globalDateRange} userInfo={userInfo} />}
        <div className={styles.qualityAppel} ref="four">
          {userInfo && (
            <IMPartLeft
              cellClick={this.cellClick}
              loadingStatus={this.state.loadingStatus}
              reasonTypeClick={this.reasonTypeClick}
              userInfo={userInfo}
            />
          )}
          {date.startDate && <IMPartRight date={date} />}
        </div>
        {date.startDate && userInfo && <NPSEvaluate ref="five" date={date} userInfo={userInfo} />}
      </div>
    );
  }
}

export default ManagementBench;
