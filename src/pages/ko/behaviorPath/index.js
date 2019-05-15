import React from 'react';
import { connect } from 'dva';
import BITabs from '@/ant_components/BITabs';
import styles from './style.less';
import Study from './components/study';
import Im from './components/im';
import Bbs from './components/bbs';
import WeChart from './components/weChart';
import UserInfo from './components/userInfo';
import PrivateLetter from './components/privateLetter';
const TabPane = BITabs.TabPane;

@connect(({ behaviorPath }) => ({
  behaviorPath
}))

class BehaviorPath1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: "1",
      study: true,
      im: true,
      weChart: true,
      bbs: true,
      letter: true,
      page: 1,
      pageSize: 10,
      stuId: JSON.parse(this.props.location.query.params).userId
    }
  }

  componentDidMount() {
    this.getDateList(this.state.activeKey); // 获取日期列表
    this.getUserInfo();
  }
  componentWillReceiveProps(nextProps) {
    if ((JSON.stringify(nextProps.behaviorPath.dateListStudy) !== JSON.stringify(this.props.behaviorPath.dateListStudy))) {
      this.setState({
        study: false
      })
    }
    if ((JSON.stringify(nextProps.behaviorPath.dateListIm) !== JSON.stringify(this.props.behaviorPath.dateListIm))) {
      this.setState({
        im: false
      })
    }
    if ((JSON.stringify(nextProps.behaviorPath.dateListWechart) !== JSON.stringify(this.props.behaviorPath.dateListWechart))) {
      this.setState({
        weChart: false
      })
    }
    if ((JSON.stringify(nextProps.behaviorPath.dateListBbs) !== JSON.stringify(this.props.behaviorPath.dateListBbs))) {
      this.setState({
        bbs: false
      })
    }
    if ((JSON.stringify(nextProps.behaviorPath.dateListLetter) !== JSON.stringify(this.props.behaviorPath.dateListLetter))) {
      this.setState({
        letter: false
      })
    }
  }

  getDateList = (type) => {
    let stuId = this.state.stuId
    this.props.dispatch({
      type: 'behaviorPath/getDateList',
      payload: { params: { stuId: stuId, type: type, page: this.state.page, pageSize: this.state.pageSize } },
      // payload: { params: { stuId: 10257895, type: type } },
    });
  };
  getUserInfo = () => {
    this.props.dispatch({
      type: 'behaviorPath/userInfo',
      payload: { params: { userId: this.state.stuId } },
    });
  }

  onTabChange = (e) => {
    if (e == "1" && !this.state.study) {
      return;
    } else if (e == "2" && !this.state.im) {
      return;
    } else if (e == "3" && !this.state.weChart) {
      return;
    } else if (e == "4" && !this.state.bbs) {
      return;
    } else if (e == "5" && !this.state.letter) {
      return;
    } else {
      this.getDateList(e)
    }

  }

  render() {
    const pathParams = JSON.parse(this.props.location.query.params)
    const target = pathParams.target
    const userInfoParams = this.props.behaviorPath.userInfo
    if (target.indexOf("im") == 0) {
      this.state.activeKey = "2"
    } else if (target.indexOf("bbs") == 0) {
      this.state.activeKey = "4"
    } else if (target.indexOf("wechat") == 0) {
      this.state.activeKey = "3"
    } else if (target.indexOf("study") == 0) {
      this.state.activeKey = "1"
    }

    return (
      <div className={styles.behaviorPath}>
        <div className={styles.headBar}>用户行为轨迹</div>
        <div className={styles.tabBox}>
          <BITabs onChange={this.onTabChange} type="card" animated={false} defaultActiveKey={this.state.activeKey}>
            <TabPane tab="学习" key="1">
              <Study stuId={pathParams.userId}></Study>
            </TabPane>
            <TabPane tab="IM" key="2">
              <Im stuId={pathParams.userId}></Im>
            </TabPane>
            <TabPane tab="微信" key="3">
              <WeChart stuId={pathParams.userId}></WeChart>
            </TabPane>
            <TabPane tab="BBS" key="4">
              <Bbs stuId={pathParams.userId}></Bbs>
            </TabPane>
            <TabPane tab="私信" key="5">
              <PrivateLetter stuId={pathParams.userId}></PrivateLetter>
            </TabPane>
          </BITabs>
        </div>
        <div style={{ position: "absolute", left: "720px", top: "108px" }}>
          {
            userInfoParams ? <UserInfo info={userInfoParams}></UserInfo> : null
          }
        </div>
      </div>
    );
  }
}

export default BehaviorPath1;
