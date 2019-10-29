import React from 'react';
import { Input, message } from 'antd';
import { connect } from 'dva';
import BITabs from '@/ant_components/BITabs';
import styles from './style.less';
import Study from './components/study';
import Im from './components/im';
import Bbs from './components/bbs';
import WeChart from './components/weChart';
import UserInfo from './components/userInfo';
import PrivateLetter from './components/privateLetter';
import { handleTNDateValue } from '@/pages/ko/utils/utils';
const TabPane = BITabs.TabPane;
const { Search } = Input;

@connect(({ behaviorPath, koPlan }) => ({
  behaviorPath,
  currentServiceTime: koPlan.currentServiceTime,
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
      inputStuId: '',
      stuId: JSON.parse(this.props.location.query.params).userId,
      searchType: null
    }
  }

  componentDidMount() {
    if (!this.props.currentServiceTime) {
      this.props.dispatch({
        type: 'koPlan/getCurrentTime',
        callback: () => {
          this.getDateList(this.state.activeKey); // 获取日期列表
          this.getUserInfo();
        }
      });
    } else {
      this.getDateList(this.state.activeKey); // 获取日期列表
      this.getUserInfo();
    }
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
        }
      },
    });
  };
  getUserInfo = () => {
    this.props.dispatch({
      type: 'behaviorPath/userInfo',
      payload: { params: { userId: this.state.stuId } },
    });
  }

  onTabChange = (e) => {
    this.setState({
      searchType: e
    })
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
  onChange(e) {
    const value = e.target.value.replace(/[^\d]/g, '')
    this.setState({
      inputStuId: value
    })
  }
  onSearchUser(e) {
    const value = e.replace(/[^\d]/g, '')
    if (!value) {
      message.error('请输入学员id');
      return;
    }
    this.setState({
      stuId: value
    }, () => {
      const param = this.state.searchType ? this.state.searchType : this.state.activeKey
      this.getDateList(param); // 获取日期列表
      this.getUserInfo();
    })

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
    const sutId = this.state.inputStuId || pathParams.userId

    return (
      <div className={styles.behaviorPath}>
        <div className={styles.headBar}>用户行为轨迹</div>
        <div style={{ display: "flex", position: "relative" }}>
          <div className={styles.tabBox}>
            <div className={styles.inputBox}>
              <Search
                allowClear
                placeholder="输入学员ID"
                maxLength={10}
                value={this.state.inputStuId}
                onChange={value => this.onChange(value)}
                onSearch={value => this.onSearchUser(value)}
              />
              {/* <Input placeholder="输入学员ID" allowClear onChange={this.changeUserId} /> */}
            </div>
            <BITabs onChange={this.onTabChange} type="card" animated={false} defaultActiveKey={this.state.activeKey}>
              <TabPane tab="学习" key="1">
                <Study stuId={sutId}></Study>
              </TabPane>
              <TabPane tab="IM" key="2">
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
            </BITabs>
          </div>
          <div style={{ marginTop: "40px" }}>
            {
              userInfoParams ? <UserInfo info={userInfoParams}></UserInfo> : null
            }
          </div>
        </div>
      </div>
    );
  }
}

export default BehaviorPath1;
