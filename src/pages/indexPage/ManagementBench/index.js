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
import moment from 'moment'
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
        reasonTypeId:0
      },
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
  reasonTypeClick = (item) => {
    this.setState({
      reasonTypeId: item.typeId
    }, () => {
      this.getReasonListData();
    })
  }
  cellClick = (item, record, type) => {
    console.log()
    const {date} = this.state
    let reasonTypeId = this.state.reasonTypeId;
    if (item) {
      reasonTypeId = item.typeId
    } else if (type == 'total' && this.state.reasonTypeId == 0) {
      reasonTypeId = 0
    }
    let params={
      startTime:moment(date.startDate).format('YYYY-MM-DD'),
      endTime:moment(date.endDate).format('YYYY-MM-DD'),
      dementionId:16,
      reasonTypeId:reasonTypeId,
      orgId:record.orgId,
      orgClick:this.orgClick,
      orgType:record.groupType
    }
    window.open(`/inspector/xdCredit/index?params=${JSON.stringify(params)}`);
  }
  getReasonListData() {
    const {date} = this.state
    const params = {
      startTime: moment(date.startDate).format('YYYY-MM-DD'),
      endTime:moment(date.endDate).format('YYYY-MM-DD'),
      familyType: null,
      groupType: null,
      orgId: null,
      reasonTypeId: this.state.reasonTypeId
    }
    this.props.dispatch({
      type: 'xdManagementBench/reasonList',
      payload: { params }
    });
    // this.getImDetail();
  }
  render() {
    const { date } = this.state;
    const {userInfo={}} = this.props
    return (
      <div className={styles.workbench}>
        {date.startDate && <Header date={date} />}
        {date.startDate && <IncomeCompare date={date} />}
        {date.startDate && userInfo &&  <ScoreContrast ref="one" date={date} userInfo={userInfo}/>}
        <div className={styles.qualityAppel} ref="four">
          {userInfo && <IMPartLeft  cellClick={this.cellClick} reasonTypeClick={this.reasonTypeClick}/>}
          <IMPartRight />
        </div>
        {date.startDate && userInfo && <NPSEvaluate ref="five" date={date} userInfo={userInfo}/>}
      </div>
    );
  }
}

export default ManagementBench;
