import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { message } from 'antd/lib/index';
import BIButton from '@/ant_components/BIButton';
import BIDrawer from '@/components/BIDrawer';
import PkDimension from './dimension';
import PkDrawer from './pkDrawer';
import closeImg from '@/assets/xdFamily/closeeye.png';
import showImg from '@/assets/xdFamily/eye.png';
import { setLocalValue } from '@/pages/indexPage/components/utils/utils';
import { handleDataTrace } from '@/utils/utils';
import styles from './style.less';

const { BI = {} } = window;
const localKey = 'familyLocal'
@connect(({ xdFamilyModal, loading }) => ({
  kpiTimes: xdFamilyModal.familyKpiInfo || {},
}))
class currentCredit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false, // 抽屉切换
      ...this.getLocalValue(), 
    }
  }
  // 初始化数据
  getLocalValue = () => {
    const {pkfamily = [], hasData} = JSON.parse(localStorage.getItem(localKey)) || {};
    return { 
      pkfamily: pkfamily, // 选中PK数组
      hasData: hasData && hasData === 2 ? false : true // 学分基础信息切换显示
    };
  }
  // 增减PK者
  clickRow = (id) => {
    const { pkfamily } = this.state;
    if (pkfamily instanceof Array) {
      if (pkfamily.includes(id)) {
        BI.traceV &&  BI.traceV({"widgetName":"本期学分-删除pk对象按钮","traceName":"本期学分-删除pk对象按钮"})
        pkfamily.splice(pkfamily.indexOf(id), 1);
      } else {
        if (pkfamily.length >= 5) {
          message.error('最多选择5个pk对象');
          return;
        }
        pkfamily.push(id);
      }
    }
    setLocalValue({pkfamily}, localKey);
    this.setState({ pkfamily: [...pkfamily] });
  }
  // 显示隐藏数据
  toggleData = () => {
    const hasData = !this.state.hasData;
    localStorage.setItem('hasDataCredit', hasData ? 1 : 2);
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
  // 隐藏数据
  getNumValue = (n, s = 160) => {
    if(!this.state.hasData) return n - s;
    return n;
  }
  // 维度列表
  getGroupPkData = callback => {
    this.props.dispatch({
      type: 'xdFamilyModal/getFamilyScorePk',
      payload: { params: { pkfamily: this.state.pkfamily } },
      callback: res => callback(res)
    });
  }
 // 对比小组列表
  getGroupList =(orgValue, callback)  => {
    const paramsItem = orgValue === 1 ? 'groupType' : 'kpiLevelId';
    this.props.dispatch({
      type: 'xdFamilyModal/getFamilyRankList',
      payload: { params: { [paramsItem]:  this.state.studentValue} },
      callback: res => callback(res),
    })
  }
  render() {
    const { pkfamily, visible, hasData } = this.state;
    const { startTime, endTime } = this.props.kpiTimes;
    return (
      <div className={styles.container}>
        <span className={styles.right}>
          <BIButton onClick={() => handleDataTrace({"widgetName":"消息差评快捷入口","traceName":"班主任工作台/消息差评入口"})} type="online" style={{marginRight: '8px'}}><Link to={`/xdCredit/index?params=${JSON.stringify({startTime, endTime, "dementionId": 16 }) }`} target='_black'>IM差评快捷入口</Link></BIButton>
          <BIButton onClick={this.toggleData} type="online"><img style={{width: '16px', marginRight: '8px'}} src={ hasData ? showImg : closeImg} alt='icon'/>{hasData ? '隐藏' : '显示'}基础信息</BIButton>
        </span>
        <PkDimension
          toggleDrawer={this.toggleDrawer} 
          changePkFn={this.clickRow}
          hasData={hasData}
          pkGroupList={pkfamily}
          getNumValue={this.getNumValue}
          getGroupPkData={this.getGroupPkData}
        />
        <BIDrawer
        onClose={() => this.toggleDrawer(false)}
        onOpen={() => this.toggleDrawer(true)}
        visible={visible}
        drawerStyle={{width: '40%'}}
        >
          <PkDrawer 
          hasData={hasData} 
          pkGroupList={pkfamily} 
          clickRow={this.clickRow} 
          getNumValue={this.getNumValue}
          getGroupList={this.getGroupList}
          columnOrgName='familyName'
          mineFlag='myFamily'
          pkValue='familyId'
          localKey={localKey}
          />
        </BIDrawer>
      </div>
    );
  }
}
export default currentCredit;
