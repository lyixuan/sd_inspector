import React from 'react';
import { connect } from 'dva';
import Container from '@/components/BIContainer';
import Appeal from './components/appeal';
import ReactDOM from 'react-dom';
import ScoreContrast from './components/scoreContrast';
import IMPartLeft from './components/IMPartLeft';
import IMPartRight from './components/IMPartRight';
import NPSEvaluate from './components/NPSEvaluate';
import Quality from '../quality/index';
import moment from 'moment';
import styles from './style.less';

@connect(({ xdFamilyModal, xdWorkModal }) => ({
  xdFamilyModal,
  userInfo: xdWorkModal.userInfo,
}))
class Negative extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: localStorage.getItem('admin_user').userId,
      date: {
        startDate: null,
        kpiMonth: null,
        endDate: null,
        reasonTypeId: 0,
      },
      orgId: null,
      orgType: null,
      loadingStatus: true,
    };
  }
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.xdFamilyModal.getCurrentDateRangeData &&
      nextProps.xdFamilyModal.getCurrentDateRangeData.startDate !== this.state.date.startDate
    ) {
      this.setState({ date: nextProps.xdFamilyModal.getCurrentDateRangeData });
    }
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
      })
      .then(res => {
        this.getReasonListData();
      });
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
  getReasonListData() {
    const { date } = this.state;
    const { userInfo = {} } = this.props;
    const params = {
      startTime: moment(date.startDate).format('YYYY-MM-DD'),
      endTime: moment(date.endDate).format('YYYY-MM-DD'),
      familyType: null,
      groupType: userInfo.userType,
      orgId: userInfo.familyId,
      reasonTypeId: this.state.reasonTypeId,
    };
    this.props.dispatch({
      type: 'xdFamilyModal/reasonList',
      payload: { params },
    });
    // this.getImDetail();
  }
  componentWillUnmount = () => {
    this.setState = (state, callback) => {
      return;
    };
  };

  render() {
    const { date } = this.state;
    const { userInfo = {} } = this.props;
    return (
      <div style={{ width: '100%' }}>
        {/* {date.startDate && userInfo && <ScoreContrast date={date} userInfo={userInfo} />} */}
        <div className={styles.qualityAppel}>
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
        {date.startDate && userInfo && <NPSEvaluate date={date} userInfo={userInfo} />}
        <div className={styles.appealWrap}>
          <Appeal userId={this.props.userId} date={date} />
          <Quality userId={this.props.userId} />
        </div>
      </div>
    );
  }
}

export default Negative;
