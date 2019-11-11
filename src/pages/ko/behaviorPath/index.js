import React from 'react';
import { Input, message } from 'antd';
import { connect } from 'dva';
import BhTabs from './components/BhTabs';
import Study from './components/study';
import Im from './components/im';
import Bbs from './components/bbs';
import WeChart from './components/weChart';
import UserInfo from './components/userInfo';
import PrivateLetter from './components/privateLetter';
import UserPortary from './components/userPortary';
import Score from './components/score';

import { handleTNDateValue } from '@/pages/ko/utils/utils';
import styles from './style.less';

const TabPane = BhTabs.TabPane;
const { Search } = Input;

const portray = { widgetName: "画像", traceName: "学员查询/学员档案/画像" };
const study = { widgetName: "学习", traceName: "学员查询/学员档案/学习" };
const im = { widgetName: "IM", traceName: "学员查询/学员档案/IM" };
const wechat = { widgetName: "微信", traceName: "学员查询/学员档案/微信" };
const bbs = { widgetName: "BBS", traceName: "学员查询/学员档案/BBS" };
const letter = { widgetName: "私信", traceName: "学员查询/学员档案/私信" };
let traceTab = '';

@connect(({ behaviorPath, koPlan, loading }) => ({
  loading,
  behaviorPath,
  currentServiceTime: koPlan.currentServiceTime,
  portaryLoading: loading.effects['behaviorPath/getBasicInfo'] || loading.effects['behaviorPath/getTagInfo'] || loading.effects['behaviorPath/getStatInfo'],
}))

class BehaviorPath1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: '6',
      study: true,
      im: true,
      weChart: true,
      bbs: true,
      letter: true,
      page: 1,
      pageSize: 10,
      inputStuId: '',
      stuId: JSON.parse(this.props.location.query.params).userId,
      searchType: null,
    };
  }

  componentDidMount() {
    this.getUserPortary();
    if (!this.props.currentServiceTime) {
      this.props.dispatch({
        type: 'koPlan/getCurrentTime',
        callback: () => {
          this.getDateList(this.state.activeKey); // 获取日期列表
          this.getUserInfo();
        },
      });
    } else {
      this.getDateList(this.state.activeKey); // 获取日期列表
      this.getUserInfo();
    }
    this.jumpInfoTrace();
  }

  jumpInfoTrace = () => {
    const pathParams = JSON.parse(this.props.location.query.params);
    const target = pathParams.target;
    if (target.indexOf('im') === 0) {
      traceTab = im;
    } else if (target.indexOf('bbs') === 0) {
      traceTab = bbs;
    } else if (target.indexOf('wechat') === 0) {
      traceTab = wechat;
    } else if (target.indexOf('study') === 0) {
      traceTab = study;
    } else {
      traceTab = portray;
    }
    const { BI = {} } = window;
    traceTab && BI.traceV && BI.traceV(traceTab)
  };

  componentWillReceiveProps(nextProps) {
    if ((JSON.stringify(nextProps.behaviorPath.dateListStudy) !== JSON.stringify(this.props.behaviorPath.dateListStudy))) {
      this.setState({
        study: false,
      });
    }
    if ((JSON.stringify(nextProps.behaviorPath.dateListIm) !== JSON.stringify(this.props.behaviorPath.dateListIm))) {
      this.setState({
        im: false,
      });
    }
    if ((JSON.stringify(nextProps.behaviorPath.dateListWechart) !== JSON.stringify(this.props.behaviorPath.dateListWechart))) {
      this.setState({
        weChart: false,
      });
    }
    if ((JSON.stringify(nextProps.behaviorPath.dateListBbs) !== JSON.stringify(this.props.behaviorPath.dateListBbs))) {
      this.setState({
        bbs: false,
      });
    }
    if ((JSON.stringify(nextProps.behaviorPath.dateListLetter) !== JSON.stringify(this.props.behaviorPath.dateListLetter))) {
      this.setState({
        letter: false,
      });
    }
  }

  getDateList = (type) => {
    let stuId = this.state.stuId;
    const beginDate = this.props.behaviorPath.dateRange ? this.props.behaviorPath.dateRange.beginDate : new Date(new Date().getTime());
    const endDate = handleTNDateValue(1, this.props.currentServiceTime);
    this.props.dispatch({
      type: 'behaviorPath/getDateList',
      payload: {
        params: {
          stuId,
          type,
          page: this.state.page,
          pageSize: this.state.pageSize,
          beginDate,
          endDate,
        },
      },
    });
  };
  getUserInfo = () => {
    this.props.dispatch({
      type: 'behaviorPath/userInfo',
      payload: { params: { userId: this.state.stuId } },
    });
  };
  getUserPortary = () => {
    this.props.dispatch({
      type: 'behaviorPath/getBasicInfo',
      payload: { params: { stuId: this.state.stuId } },
    });
    this.props.dispatch({
      type: 'behaviorPath/getTagInfo',
      payload: { params: { stuId: this.state.stuId } },
    });
    this.props.dispatch({
      type: 'behaviorPath/getStatInfo',
      payload: { params: { stuId: this.state.stuId } },
    });
    this.props.dispatch({
      type: 'behaviorPath/getDetailInfo',
      payload: { params: { stuId: this.state.stuId } },
    });
  };

  onTabChange = (e) => {
    if (e === '1') {
      traceTab = study;
    } else if (e === '2') {
      traceTab = im;
    } else if (e === '3') {
      traceTab = wechat;
    } else if (e === '4') {
      traceTab = bbs;
    } else if (e === '5') {
      traceTab = letter;
    } else if (e === '6') {
      traceTab = portray;
    } else {
      traceTab = '';
    }
    const { BI = {} } = window;
    traceTab && BI.traceV && BI.traceV(traceTab)

    this.setState({
      searchType: e,
    });
    if (e === '1' && !this.state.study) {
      return;
    } else if (e === '2' && !this.state.im) {
      return;
    } else if (e === '3' && !this.state.weChart) {
      return;
    } else if (e === '4' && !this.state.bbs) {
      return;
    } else if (e === '5' && !this.state.letter) {
      return;
    } else if (e === '6') {
      return;
    } else {
      this.getDateList(e);
    }
  };

  onChange(e) {
    const value = e.target.value.replace(/[^\d]/g, '');
    this.setState({
      inputStuId: value,
    });
  }

  onSearchUser(e) {
    const value = e.replace(/[^\d]/g, '');
    if (!value) {
      message.error('请输入学员id');
      return;
    }
    this.setState({
      stuId: value,
    }, () => {
      const param = this.state.searchType ? this.state.searchType : this.state.activeKey;
      this.getDateList(param); // 获取日期列表
      this.getUserInfo();
      this.getUserPortary();
    });

  }

  render() {
    const { BasicInfo, TagInfo, StatInfo, DetailInfo } = this.props.behaviorPath;
    const { activeStat, orderStat, learnStat } = StatInfo || {};
    const { learnDetail, imDetail, exerciseDetail } = DetailInfo || {};
    const pathParams = JSON.parse(this.props.location.query.params);
    const target = pathParams.target;
    const userInfoParams = this.props.behaviorPath.userInfo;
    if (target.indexOf('im') == 0) {
      this.state.activeKey = '2';
    } else if (target.indexOf('bbs') == 0) {
      this.state.activeKey = '4';
    } else if (target.indexOf('wechat') == 0) {
      this.state.activeKey = '3';
    } else if (target.indexOf('study') == 0) {
      this.state.activeKey = '1';
    } else {
      this.state.activeKey = '6';
    }
    const sutId = this.state.inputStuId || pathParams.userId;

    console.log(1,this.state.searchType)
    console.log(2,this.state.activeKey)
    console.log(3,userInfoParams)
    return (
      <>
        <div className={styles.behaviorPath}>
          <div className={styles.headBar}>学员档案</div>
          <div className={styles.tabBlank}>&nbsp;</div>
          <div className={styles.layoutbg}>
            <div className={styles.tabBox}>
              <BhTabs onChange={this.onTabChange} animated={false} defaultActiveKey={this.state.activeKey}>
                <TabPane tab="画像" key="6">
                </TabPane>
                <TabPane tab="学习" key="1">
                  <Study stuId={sutId}></Study>
                </TabPane>
                <TabPane tab="IM" key="2" className="abc">
                  <Im stuId={sutId}></Im>
                </TabPane>
                <TabPane tab="微信" key="3">
                  <WeChart stuId={sutId}></WeChart>
                </TabPane>
                <TabPane tab="BBS" key="4">
                  <Bbs stuId={sutId}></Bbs>
                </TabPane>
                <TabPane tab="私信" key="5">
                  <PrivateLetter stuId={sutId}></PrivateLetter>
                </TabPane>
                <TabPane tab="成绩" key="7"></TabPane>
              </BhTabs>
            </div>
            <div style={{ marginTop: '40px' }}>
              {
                ((this.state.searchType && this.state.searchType === '6') || (!this.state.searchType && this.state.activeKey === '6') || (this.state.searchType && this.state.searchType === '7') || (!this.state.searchType && this.state.activeKey === '7')) ? null : userInfoParams ?
                  <UserInfo info={userInfoParams}></UserInfo> : null
              }
            </div>
            <div
              className={styles.inputBox}>
              <Search
                allowClear
                placeholder="输入学员ID"
                maxLength={10}
                width={260}
                value={this.state.inputStuId}
                onChange={value => this.onChange(value)}
                onSearch={value => this.onSearchUser(value)}
              />
              {/* <Input placeholder="输入学员ID" allowClear onChange={this.changeUserId} /> */}
            </div>
          </div>
        </div>
        {
          ((this.state.searchType && this.state.searchType === '6') || (!this.state.searchType && this.state.activeKey === '6')) ?
            <UserPortary stuId={sutId}
              baseInfo={BasicInfo}
              tagInfo={TagInfo}
              orderStat={orderStat}
              activeStat={activeStat}
              learnStat={learnStat}
              learnDetail={learnDetail}
              imDetail={imDetail}
              isLoading={this.props.portaryLoading}
              exerciseDetail={exerciseDetail} /> : null
        }
        {
          ((this.state.searchType && this.state.searchType === '7') || (!this.state.searchType && this.state.activeKey === '7')) ?
            <Score stuId={sutId} info={userInfoParams}/> : null
        }
      </>
    );
  }
}

export default BehaviorPath1;
