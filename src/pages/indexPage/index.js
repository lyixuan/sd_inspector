import React, { Component } from 'react';
import { connect } from 'dva';
import { Spin } from 'antd';
import MainPage from './mainPage/index';
import ScoreIncome from './component2/ScoreIncome';
import OperationEvent from './component2/OperationEvent';
import ImNps from './component2/ImNps';
import QualityAppeal from './component2/QualityAppeal';
import homeImg from '@/assets/homeImg.png';
import homeText from '@/assets/homeText.png';
import moment from 'moment/moment';
import styles from './indexPage.less';

@connect(({ xdWorkModal, loading }) => ({
  xdWorkModal,
  userInfo:xdWorkModal.userInfo,
  loadingTime: loading.effects['xdWorkModal/getCurrentDateRange'],
  getCurrentDateRangeData: xdWorkModal.getCurrentDateRangeData,
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
    }).then(res => {
      if (this.getPageDom()) {
        this.props
        .dispatch({
          type: 'xdWorkModal/getCurrentDateRange',
          payload: { params: { userType: 'family' } },
        })
        .then(res => {
          this.setState({ date: res });
          this.getData(res);
          this.getNpsData(res);
          this.getImNegativeData(res);
          this.getImPieData(res);
          this.getAppealData();
          this.getQualityData();
        });
      }
    })
  }

  // 获取nps接口
  getNpsData = () => {
    const { startTime, endTime } = this.props.getCurrentDateRangeData;
    if (startTime) {
      this.props.dispatch({
        type: 'xdWorkModal/getNpsData',
        payload: { params: { startTime, endTime } },
      });
    }
  };

  // 获取IM负面数据接口
  getImNegativeData = date => {
    const { startTime, endTime } = this.props.getCurrentDateRangeData;
    this.props.dispatch({
      type: 'xdWorkModal/getImNegativeData',
      payload: { params: { startTime, endTime } },
    });
  };

  // 获取IM饼图接口
  getImPieData = date => {
    const { startTime, endTime } = this.props.getCurrentDateRangeData;
    this.props.dispatch({
      type: 'xdWorkModal/getImPieData',
      payload: { params: { startTime, endTime } },
    });
  };

  // 学分申诉
  getAppealData = () => {
    const { startTime, endTime } = this.props.getCurrentDateRangeData;
    this.props.dispatch({
      type: 'xdWorkModal/getAppealData',
      payload: { params: { startTime, endTime } },
    });
  };

  // 质检
  getQualityData = () => {
    const { startTime, endTime } = this.props.getCurrentDateRangeData;
    this.props.dispatch({
      type: 'xdWorkModal/getQualityData',
      payload: { params: { startTime, endTime } },
    });
  };

  getData = date => {
    this.props.dispatch({
      type: 'xdWorkModal/getWorkbenchScore',
      payload: {
        params: {
          startTime: moment(new Date(date.startDate)).format('YYYY-MM-DD'),
          endTime: moment(new Date(date.endDate)).format('YYYY-MM-DD'),
        },
      },
    });
    this.props.dispatch({
      type: 'xdWorkModal/getWorkbenchIncome',
      payload: {
        params: {
          startTime: moment(new Date(date.startDate)).format('YYYY-MM-DD'),
          endTime: moment(new Date(date.endDate)).format('YYYY-MM-DD'),
        },
      },
    });
    const admin_user = localStorage.getItem('admin_user');
    const userType = JSON.parse(admin_user) ? JSON.parse(admin_user).userType :'';
    const userId = JSON.parse(admin_user) ? JSON.parse(admin_user).userId :'';
    let orgType = '';
    if(userType==='boss') {
      orgType = 'boss'
    }else if(userType==='college') {
      orgType = 'college'
    }else if(userType==='family') {
      orgType = 'family'
    }else if(userType==='group'||userType==='class') {
      orgType = 'group'
    }
    this.props.dispatch({
      type: 'xdWorkModal/getTouchRatio',
      payload: {
        params: {
          operatorId:userId,
          orgType,
          startDate: "2019-12-12",
          endDate: moment().subtract(1,'days').format('YYYY-MM-DD')
        },
      },
    });
    this.props.dispatch({
      type: 'xdWorkModal/getExamYearMonth',
      payload: {
      },
    });
  };

  getPageDom = () => {
    const admin_user = localStorage.getItem('admin_user');
    const userType = JSON.parse(admin_user) ? JSON.parse(admin_user).userType : null;
    const { userInfo } = this.props;
    if ( userType === 'class' || userType === 'group' ||
    (userType === 'family' && (userInfo.privilegeView || userInfo.moreView)) ||
    ((userType === 'college' || userType === 'boss') && (userInfo.privilegeView || userInfo.moreView))) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    const { date } = this.state;
    const { loadingTime } = this.props;
    const { WorkbenchScore, WorkbenchIncome, WorkbenchNpsData, touchRatio,examinationTime} = this.props.xdWorkModal;
    if (this.getPageDom()) {
      return (
        <Spin spinning={loadingTime}>
          <OperationEvent touchRatio={touchRatio} provinceList={examinationTime}/>
          <ScoreIncome
            date={date}
            WorkbenchScore={WorkbenchScore}
            WorkbenchIncome={WorkbenchIncome}
          />
          <ImNps WorkbenchNpsData={WorkbenchNpsData} />
          <QualityAppeal WorkbenchNpsData={WorkbenchNpsData} />
        </Spin>
      );
    } else {
      return (
        <div className={styles.container}>
          <div className={styles.content}>
            <img src={homeImg} alt="首页" className={styles.homeImg} />
            <div className={styles.userDescription}>
              <img src={homeText} alt="首页文字" />
            </div>
          </div>
        </div>
      );
    }
  }
}

export default IndexPage;
