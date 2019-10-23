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

import { handleTNDateValue } from '@/pages/ko/utils/utils';
import styles from './style.less';

const TabPane = BhTabs.TabPane;
const { Search } = Input;

@connect(({ behaviorPath, koPlan }) => ({
  behaviorPath,
  currentServiceTime: koPlan.currentServiceTime,
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
  }

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

  onTabChange = (e) => {
    this.setState({
      searchType: e,
    });
    if (e == '1' && !this.state.study) {
      return;
    } else if (e == '2' && !this.state.im) {
      return;
    } else if (e == '3' && !this.state.weChart) {
      return;
    } else if (e == '4' && !this.state.bbs) {
      return;
    } else if (e == '5' && !this.state.letter) {
      return;
    } else if (e == '6') {
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
    });

  }

  render() {
    const baseInfo = {
      'imageUrl': null,
      'stuName': '姓名',
      'nickName': '昵称',
      'sex': '男',
      'age': 26,
      'city': '北京',
      'collegeName': '自变量学院',
      'familyName': '汉语言家族',
      'groupName': '产研小组',
      'businessName': '很长的前端学院',
      'registerDate': '2019-09-09',
      'serviceEndDate': '2019-09-11',
    };
    const tagInfo = {
      'learnInitiative': {
        'dayCount': -1, 'dayPercent': 1, 'liveTime': 10847788, 'replayTime': 61602309,
      },
      'exerciseInitiative': { 'dayCount': 2, 'dayPercent': 83838877, 'exerciseCount': 39814673 },
      consultCount: 6061,
      'negativeList': [
        {
          'countDate': '2019-09-09',
          'count': 2,
        }],
      'imNonRatio': 0.47820885,
      'exerciseRatio': 0.85,
    };

    const activeStat = [
      {indicator:[
          {"name":"直播","max":10000},
          {"name":"重播","max":10000},
          {"name":"做题","max":10000},
          {"name":"IM","max":10000},
          {"name":"微信","max":10000},
          {"name":"BBS","max":10000}
        ],
        data:[{"value" : [430, 100, 280, 3500, 500, 1900]}],
        time:"1910考期"
      },
      {indicator:[
          {"name":"直播","max":20000},
          {"name":"重播","max":20000},
          {"name":"做题","max":20000},
          {"name":"IM","max":20000},
          {"name":"微信","max":20000},
          {"name":"BBS","max":20000}
        ],
        data:[{"value" : [4300, 10000, 8000, 3000, 5000, 19000]}],
        time:"1904考期"
      }
    ];
    const orderStat = [

    ];
    const learnStat = [
      {"indicator":[
          {"name":"1月","max":10000},
          {"name":"2月","max":10000},
          {"name":"3月","max":10000},
          {"name":"4月","max":10000},
          {"name":"5月","max":10000},
          {"name":"6月","max":10000},
          {"name":"7月","max":10000},
          {"name":"8月","max":10000},
          {"name":"9月","max":10000},
          {"name":"10月","max":10000},
          {"name":"11月","max":10000},
          {"name":"12月","max":10000},
        ],
        "data":[
          {"value" : [4300, 1000, 2800,123,3444,10000,444,555,666,777,888,999],"name":"直播"},
          {"value" : [2300, 3000, 2100,1223,3414,2300,4344,5355,6626,7737,8828,9919],"name":"重播"}],
        "time":"2019"
      },
      {"indicator":[
          {"name":"1月","max":10000},
          {"name":"2月","max":10000},
          {"name":"3月","max":10000},
          {"name":"4月","max":10000},
          {"name":"5月","max":10000},
          {"name":"6月","max":10000},
          {"name":"7月","max":10000},
          {"name":"8月","max":10000},
          {"name":"9月","max":10000},
          {"name":"10月","max":10000},
          {"name":"11月","max":10000},
          {"name":"12月","max":10000},
        ],
        "data":[
          {"value" : [300, 100, 280,13,344,2000,44,555,66,7717,828,3399],"name":"直播"},
          {"value" : [230, 2300, 200,223,314,230,1344,2355,3626,4737,1828,1919],"name":"重播"}],
        "time":"2018"
      }];
    const learnDetail = {
      "legend":["直播","重播"],
      "data":[["2015-11-08",10,"直播"],["2015-11-09",15,"直播"],["2015-11-10",35,"直播"],["2015-11-11",0,"直播"],["2015-11-12",11,"直播"],["2015-11-08",35,"重播"],["2015-11-09",36,"重播"],["2015-11-10",37,"重播"],["2015-11-11",37,"重播"],["2015-11-12",37,"重播"]]
    };
    const imDetail =
    {
      "xAxisData":["2019-01-01","2019-01-02","2019-01-03","2019-01-04","2019-01-05","2019-01-06","2019-01-07","2019-01-08"],
      "positiveCount":[100,11,22,33,44,55,66,77],
      "negativeCount":[-10,-12,-33,-111,-44,-63,-63,-12]
    };
    const exerciseDetail = {
      "xAxis":["2019-01-01","2019-01-02","2019-01-03","2019-01-04","2019-01-05","2019-01-06","2019-01-07","2019-01-08"],
      "correctNum":[100,11,22,33,44,55,66,77],"totalNum":[1020,112,222,233,424,552,626,772]}

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

    return (
      <>
        <div className={styles.behaviorPath}>
          <div className={styles.headBar}>用户档案</div>
          <div className={styles.tabBlank}>&nbsp;</div>
          <div className={styles.layoutbg}>
            <div className={styles.tabBox}>
              <div
                className={((this.state.searchType && this.state.searchType === '6') || (!this.state.searchType && this.state.activeKey === '6')) ? styles.inputBox2 : styles.inputBox}>
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
              <BhTabs onChange={this.onTabChange} animated={false} defaultActiveKey={this.state.activeKey}>
                <TabPane tab="画像" key="6">
                </TabPane>
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
              </BhTabs>
            </div>
            <div style={{ marginTop: '40px' }}>
              {
                ((this.state.searchType && this.state.searchType === '6') || (!this.state.searchType && this.state.activeKey === '6')) ? null : userInfoParams ?
                  <UserInfo info={userInfoParams}></UserInfo> : null
              }
            </div>
          </div>
        </div>
        {
          ((this.state.searchType && this.state.searchType === '6') || (!this.state.searchType && this.state.activeKey === '6')) ?
            <UserPortary stuId={sutId}
                         baseInfo={baseInfo}
                         tagInfo={tagInfo}
                         orderStat={orderStat}
                         activeStat={activeStat}
                         learnStat={learnStat}
                         learnDetail={learnDetail}
                         imDetail={imDetail}
                         exerciseDetail={exerciseDetail}/> :null
        }
      </>
    );
  }
}

export default BehaviorPath1;
