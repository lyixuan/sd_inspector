import React from 'react';
import { connect } from 'dva';
import Container from '@/components/BIContainer';
import Appeal from './components/appeal';
import ReactDOM from 'react-dom';
import ScoreContrast from './components/scoreContrast';
import IMPartLeft from './components/IMPartLeft';
import IMPartRight from './components/IMPartRight';
import NPSEvaluate from './components/NPSEvaluate';
import moment from 'moment';
import styles from './style.less';

@connect(({ xdManagementBench, xdWorkModal }) => ({
  xdManagementBench,
  userInfo: xdWorkModal.userInfo,
}))
class AppalCom extends React.Component {
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
  // componentDidMount() {
  //   this.props
  //     .dispatch({
  //       type: 'xdManagementBench/getCurrentDateRange',
  //       payload: { params: { userType: 'family' } },
  //     })
  //     .then(res => {
  //       this.setState({
  //         date: {
  //           startDate: res.startDate,
  //           endDate: res.endDate,
  //           kpiMonth: res.kpiMonth,
  //         },
  //       });
  //     })
  //     .then(res => {
  //       this.getReasonListData();
  //     });
  // }

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
    const params = {
      startTime: moment(date.startDate).format('YYYY-MM-DD'),
      endTime: moment(date.endDate).format('YYYY-MM-DD'),
      familyType: null,
      groupType: null,
      orgId: null,
      reasonTypeId: this.state.reasonTypeId,
    };
    this.props.dispatch({
      type: 'xdManagementBench/reasonList',
      payload: { params },
    });
    // this.getImDetail();
  }

  render() {
    const { date } = this.state;
    const { userInfo = {} } = this.props;
    return (
      <Container title="本期申诉" style={{ width: '60%' }} propStyle={{ paddingLeft: '16px' }}>
        {/* {date.startDate && userInfo && <ScoreContrast date={date} userInfo={userInfo} />}
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
        {date.startDate && userInfo && <NPSEvaluate ref="five" date={date} userInfo={userInfo} />} */}
        <Appeal />
      </Container>
    );
  }
}

export default AppalCom;
