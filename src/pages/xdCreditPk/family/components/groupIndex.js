import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { message } from 'antd/lib';
import { setLocalValue } from '@/pages/indexPage/components/utils/utils';
import { handleDataTrace } from '@/utils/utils';
import BIButton from '@/ant_components/BIButton';
import BIDrawer from '@/components/BIDrawer';
import PkDimension from './pkDimension';
import PkDrawer from './pkDrawer';
import qushiImg from '@/assets/qushibtn.png';
// import closeImg from '@/assets/xdFamily/closeeye.png';
// import showImg from '@/assets/xdFamily/eye.png';
import styles from './style.less';

const { BI = {} } = window;
const localKey = 'creditGroupLocal';
@connect(({ xdCreditPkModal, loading  }) => ({
  kpiTimes: xdCreditPkModal.familyKpiTimes || {},
  groupPkList: xdCreditPkModal.groupScorePk,
  dimenloading: loading.effects['xdCreditPkModal/groupPkList'],
  drawerloading: loading.effects['xdCreditPkModal/groupList'],
}))
class GroupIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false, // 抽屉切换
      ...this.getLocalValue(), 
    }
  }
  componentDidMount() {
    this.getGroupPkData();
  }
  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(nextProps.dateRangeSelect) !== JSON.stringify(this.props.dateRangeSelect)) {
      this.getGroupPkData(nextProps.dateRangeSelect);
    }
  }
  // 初始化数据
  getLocalValue = () => {
    const {pkGroupList = []} = JSON.parse(localStorage.getItem(localKey)) || {};
    return { 
      pkGroupList, // 选中PK数组
      // hasData: hasData && hasData === 2 ? false : true // 学分基础信息切换显示
    };
  }
  // 维度列表
  getGroupPkData = ([startTime, endTime] = this.props.dateRangeSelect) => {
    this.props.dispatch({
      type: 'xdCreditPkModal/groupPkList',
      payload: { params: { pkGroupList: this.state.pkGroupList, startTime, endTime } },
    });
  }
 // 对比小组列表
  getGroupList =({studentValue}, callback)  => {
    // const paramsItem = orgValue === 1 ? 'groupType' : 'kpiLevelId';
    const [startTime, endTime] = this.props.dateRangeSelect;
    this.props.dispatch({
      type: 'xdCreditPkModal/groupList',
      payload: { params: { groupType: studentValue, startTime, endTime } },
      callback: res => callback(res),
    })
  }
  // 清空 确定 PK者
  handleAction = pkGroupList => {
    if (pkGroupList) {
      setLocalValue({ pkGroupList }, localKey);
      this.setState({ pkGroupList }, () => this.getGroupPkData());
    } else {
      setLocalValue({ pkGroupList: this.state.pkGroupList }, localKey);
      this.getGroupPkData();
    }  
  }
  handleDelete = (id) => {
    this.clickRow(id, this.handleAction);
  }
  // 增减PK者
  clickRow = (id, callback) => {
    const { pkGroupList } = this.state;
    if (pkGroupList instanceof Array) {
      if (pkGroupList.includes(id)) {
        BI.traceV &&  BI.traceV({"widgetName":"学分-删除PK小组","traceName":"家族长工作台/学分-删除PK小组"})
        pkGroupList.splice(pkGroupList.indexOf(id), 1);
      } else {
        if (pkGroupList.length >= 5) {
          message.error('最多选择5个pk对象');
          return;
        }
        pkGroupList.push(id);
      }
    }
    this.setState({ pkGroupList: [...pkGroupList] }, () => {
      if (callback && typeof callback === 'function') {
        callback();
      }
    });
  }
  // 显示隐藏数据
  // toggleData = () => {
  //   const hasData = !this.state.hasData;
  //   setLocalValue({hasData: hasData ? 1 : 2}, localKey);
  //   if (hasData) {
  //     BI.traceV &&  BI.traceV({"widgetName":"学分-显示基础信息","traceName":"家族长工作台/学分-显示基础信息"});
  //   } else {
  //     BI.traceV &&  BI.traceV({"widgetName":"学分-隐藏基础信息","traceName":"家族长工作台/学分-隐藏基础信息"});
  //   }
  //   this.setState({ hasData });
  // };
  // 抽屉切换
  toggleDrawer = (bul) => {
    if (bul) {
      BI.traceV &&  BI.traceV({"widgetName":"学分-展开PK小组","traceName":"家族长工作台/学分-展开PK小组"});
    }
    this.setState({
      visible: bul,
    });
  };
  render() {
    const { pkGroupList, visible } = this.state;
    const [startTime, endTime] = this.props.dateRangeSelect;
    return (
      <div className={styles.container}>
        <span className={styles.right}>
          <BIButton onClick={() => handleDataTrace({"widgetName":"运营组学分pk页点趋势","traceName":"运营组工作台/学分pk页/学分趋势按钮"})} type="online" style={{marginRight: '8px'}}>
            <Link to={`/xdCredit/index?params=${JSON.stringify({startTime, endTime }) }`} target='_black'>
            <img src={qushiImg} alt='' style={{ width: 15, marginRight: 6, marginTop: '-2px'}}/>学分趋势</Link>
            </BIButton>
          <BIButton onClick={() => handleDataTrace({"widgetName":"消息差评快捷入口","traceName":"家族长工作台/小组/消息差评入口"})} type="online" style={{marginRight: '8px'}}><Link to={`/xdCredit/index?params=${JSON.stringify({startTime, endTime, "dementionId": 16 }) }`} target='_black'>IM差评快捷入口</Link></BIButton>
          {/* <BIButton onClick={this.toggleData} type="online"><img style={{width: '16px', marginRight: '8px'}} src={ hasData ? showImg : closeImg} alt='icon'/>{hasData ? '隐藏' : '显示'}基础信息</BIButton> */}
        </span>
        <PkDimension
        getGroupPkData={this.getGroupPkData}
        toggleDrawer={this.toggleDrawer} 
        handleDelete={this.handleDelete}
        loading={this.props.dimenloading}
        pkUsers={pkGroupList}
        groupPkList={this.props.groupPkList}
        // hasData={hasData}
        />
        <BIDrawer
        onClose={() => this.toggleDrawer(false)}
        onOpen={() => this.toggleDrawer(true)}
        visible={visible}
        drawerStyle={{width: '40%'}}
        propsStyle={{padding: 0}}
        >
          <PkDrawer 
          dateRangeSelect={this.props.dateRangeSelect}   
          handleAction={this.handleAction}
          getGroupList={this.getGroupList}
          clickRow={this.clickRow} 
          drawerloading={this.props.drawerloading}
          dimenloading={this.props.dimenloading}
          pkUsers={pkGroupList}         
          localKey={localKey} 
          showKey={{
            serachName: '选择对比小组'
          }}
          />
        </BIDrawer>
      </div>
    );
  }
}
export default GroupIndex;
