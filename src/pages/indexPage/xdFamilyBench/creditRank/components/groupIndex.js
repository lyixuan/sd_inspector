import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { message } from 'antd/lib/index';
import { setLocalValue, fillDataSource } from '@/pages/indexPage/components/utils/utils';
import { handleDataTrace } from '@/utils/utils';
import BIButton from '@/ant_components/BIButton';
import BIDrawer from '@/components/BIDrawer';
import PkDimension from './pkDimension';
import PkDrawer from './pkDrawer';
import closeImg from '@/assets/xdFamily/closeeye.png';
import showImg from '@/assets/xdFamily/eye.png';
import styles from './style.less';

const { BI = {} } = window;
const localKey = 'groupLocal';
@connect(({ xdFamilyModal, loading  }) => ({
  kpiTimes: xdFamilyModal.familyKpiInfo || {},
  loading: loading.effects['xdFamilyModal/groupPkList'],
  drawerloading: loading.effects['xdWorkModal/groupList'],
}))
class currentCredit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groupPkList: {
        groupList: [],
        dimensionList: []
      }, // 维度数据
      visible: false, // 抽屉切换
      ...this.getLocalValue(), 
    }
  }
  componentDidMount() {
    this.getGroupPkData();
  }
  // 初始化数据
  getLocalValue = () => {
    const {pkGroupList = [], hasData} = JSON.parse(localStorage.getItem(localKey)) || {};
    return { 
      pkGroupList: pkGroupList, // 选中PK数组
      hasData: hasData && hasData === 2 ? false : true // 学分基础信息切换显示
    };
  }
  // 维度列表
  getGroupPkData = () => {
    this.props.dispatch({
      type: 'xdFamilyModal/groupPkList',
      payload: { params: { pkGroupList: this.state.pkGroupList } },
      callback: res => {
        res.dimensionList = fillDataSource(res.dimensionList);
        this.setState({ groupPkList: res });
      }
    });
  }
 // 对比小组列表
  getGroupList =(orgValue, callback)  => {
    const paramsItem = orgValue === 1 ? 'groupType' : 'kpiLevelId';
    this.props.dispatch({
      type: 'xdWorkModal/groupList',
      payload: { params: { [paramsItem]:  this.state.studentValue} },
      callback: res => callback(res),
    })
  }
  // 清空 确定 PK者
  handleAction = pkGroupList => {
    if (pkGroupList) {
      setLocalValue({ pkGroupList }, localKey);
      this.setState({ pkGroupList }, this.getGroupPkData());
    } else {
      this.getGroupPkData();
    }  
  }
  // 增减PK者
  clickRow = (id) => {
    const { pkGroupList } = this.state;
    if (pkGroupList instanceof Array) {
      if (pkGroupList.includes(id)) {
        BI.traceV &&  BI.traceV({"widgetName":"本期学分-删除pk对象按钮","traceName":"本期学分-删除pk对象按钮"})
        pkGroupList.splice(pkGroupList.indexOf(id), 1);
      } else {
        if (pkGroupList.length >= 5) {
          message.error('最多选择5个pk对象');
          return;
        }
        pkGroupList.push(id);
      }
    }
    this.setState({ pkGroupList });
  }
  // 显示隐藏数据
  toggleData = () => {
    const hasData = !this.state.hasData;
    setLocalValue({hasData: hasData ? 1 : 2}, localKey);
    if (hasData) {
      BI.traceV &&  BI.traceV({"widgetName":"本期学分-显示基础信息","traceName":"本期学分-显示基础信息"});
    } else {
      BI.traceV &&  BI.traceV({"widgetName":"本期学分-隐藏基础信息","traceName":"本期学分-隐藏基础信息"});
    }
    this.setState({
      hasData: hasData,
    });
  };
  // 抽屉切换
  toggleDrawer = (bul) => {
    this.setState({
      visible: bul,
    });
  };
  render() {
    const { pkGroupList, groupPkList, visible, hasData } = this.state;
    const { startTime, endTime } = this.props.kpiTimes;
    return (
      <div className={styles.container}>
        <span className={styles.right}>
          <BIButton onClick={() => handleDataTrace({"widgetName":"消息差评快捷入口","traceName":"班主任工作台/消息差评入口"})} type="online" style={{marginRight: '8px'}}><Link to={`/xdCredit/index?params=${JSON.stringify({startTime, endTime, "dementionId": 16 }) }`} target='_black'>IM差评快捷入口</Link></BIButton>
          <BIButton onClick={this.toggleData} type="online"><img style={{width: '16px', marginRight: '8px'}} src={ hasData ? showImg : closeImg} alt='icon'/>{hasData ? '隐藏' : '显示'}基础信息</BIButton>
        </span>
        <PkDimension
          getGroupPkData={this.getGroupPkData}
          toggleDrawer={this.toggleDrawer} 
          changePkFn={this.clickRow}
          loading={this.props.loading}
          pkGroupList={pkGroupList}
          groupPkList={groupPkList}
          hasData={hasData}
        />
        <BIDrawer
        onClose={() => this.toggleDrawer(false)}
        onOpen={() => this.toggleDrawer(true)}
        visible={visible}
        drawerStyle={{width: '40%'}}
        >
          <PkDrawer    
          getDimension={this.getGroupPkData}
          handleAction={this.handleAction}
          getGroupList={this.getGroupList}
          clickRow={this.clickRow} 
          loading={this.props.drawerloading}
          pkGroupList={pkGroupList}         
          localKey={localKey} 
          hasData={hasData} 
          showKey={{
            columnOrgName: 'groupName',
            mineFlag: 'myGroup',
            pkValue: 'groupId',
          }}
          />
        </BIDrawer>
      </div>
    );
  }
}
export default currentCredit;
