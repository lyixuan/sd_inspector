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
const localKey = 'creditFamilyLocal';
@connect(({ xdCreditPkModal, loading }) => ({
  kpiTimes: xdCreditPkModal.familyKpiTimes || {},
  groupPkList: xdCreditPkModal.familyScorePk,
  dimenloading: loading.effects['xdCreditPkModal/getFamilyScorePk'],
  drawerloading: loading.effects['xdCreditPkModal/getFamilyRankList'],
}))
class FamilyIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false, // 抽屉切换
      ...this.getLocalValue(), 
    }
  }
  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(nextProps.dateRangeSelect) !== JSON.stringify(this.props.dateRangeSelect)) {
      this.getGroupPkData(nextProps.dateRangeSelect);
    }
  }
  // 初始化数据
  getLocalValue = () => {
    const {pkfamily = []} = JSON.parse(localStorage.getItem(localKey)) || {};
    return { 
      pkfamily, // 选中PK数组
      // hasData: hasData && hasData === 2 ? false : true // 学分基础信息切换显示
    };
  }
  // 维度列表
  getGroupPkData = ([startTime, endTime] = this.props.dateRangeSelect) => {
    this.props.dispatch({
      type: 'xdCreditPkModal/getFamilyScorePk',
      payload: { params: { pkfamily: this.state.pkfamily, startTime, endTime } },
    });
  }
  // 对比小组列表
  getGroupList =({ collegeId }, callback)  => {
    const [startTime, endTime] = this.props.dateRangeSelect;
    this.props.dispatch({
      type: 'xdCreditPkModal/getFamilyRankList',
      payload: { params: { collegeId, startTime, endTime } },
      callback: res => callback(res),
    })
  }
  // 清空 确定 PK者
  handleAction = pkfamily => {
    if (pkfamily) {
      setLocalValue({ pkfamily }, localKey);
      this.setState({ pkfamily }, () => this.getGroupPkData());
    } else {
      setLocalValue({ pkfamily: this.state.pkfamily }, localKey);
      this.getGroupPkData();
    }  
  }
  // 单个删除PK者
  handleDelete = (id) => {
    this.clickRow(id, this.handleAction);
  }
  // 增减PK者
  clickRow = (id, callback) => {
    const { pkfamily } = this.state;
    if (pkfamily instanceof Array) {
      if (pkfamily.includes(id)) {
        BI.traceV &&  BI.traceV({"widgetName":"学分-删除PK家族","traceName":"家族长工作台/学分-删除PK家族"})
        pkfamily.splice(pkfamily.indexOf(id), 1);
      } else {
        if (pkfamily.length >= 5) {
          message.error('最多选择5个pk对象');
          return;
        }
        pkfamily.push(id);
      }
    }
    this.setState({ pkfamily }, () => {
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
      BI.traceV &&  BI.traceV({"widgetName":"学分-展开PK家族","traceName":"家族长工作台/学分-展开PK家族"});
    }
    this.setState({
      visible: bul,
    });
  };
  render() {
    const { pkfamily, visible, } = this.state;
    const [startTime, endTime] = this.props.dateRangeSelect;
    return (
      <div className={styles.container}>
        <span className={styles.right}>
          <BIButton onClick={() => handleDataTrace({"widgetName":"运营组学分pk页点趋势","traceName":"运营组工作台/学分pk页/学分趋势按钮"})} type="online" style={{marginRight: '8px'}}>
            <Link to={`/xdCredit/index?params=${JSON.stringify({startTime, endTime}) }`} target='_black'>
              <img src={qushiImg} alt='' style={{ width: 15, marginRight: 6, marginTop: '-2px'}}/>学分趋势</Link>
            </BIButton>
          <BIButton onClick={() => handleDataTrace({"widgetName":"消息差评快捷入口","traceName":"家族长工作台/家族/消息差评入口"})} type="online" style={{marginRight: '8px'}}><Link to={`/xdCredit/index?params=${JSON.stringify({startTime, endTime, "dementionId": 16 }) }`} target='_black'>IM差评快捷入口</Link></BIButton>
          {/* <BIButton onClick={this.toggleData} type="online"><img style={{width: '16px', marginRight: '8px'}} src={ hasData ? showImg : closeImg} alt='icon'/>{hasData ? '隐藏' : '显示'}基础信息</BIButton> */}
        </span>
        <PkDimension
          toggleDrawer={this.toggleDrawer} 
          handleDelete={this.handleDelete}
          loading={this.props.dimenloading}
          groupPkList={this.props.groupPkList}
          pkUsers={pkfamily}
          // hasData={hasData}
          showKey={{
            pkValue: 'familyId',
            columnOrgName: 'familyName'
          }}
        />
        <BIDrawer
        onClose={() => this.toggleDrawer(false)}
        onOpen={() => this.toggleDrawer(true)}
        visible={visible}
        drawerStyle={{width: '40%'}}
        propsStyle={{padding: 0}}
        closeValue='收起PK对象'
        openValue='展开PK对象'
        >
          <PkDrawer
          dateRangeSelect={this.props.dateRangeSelect}
          getGroupList={this.getGroupList}
          handleAction={this.handleAction}
          clickRow={this.clickRow}
          drawerloading={this.props.drawerloading}
          dimenloading={this.props.dimenloading}
          pkUsers={pkfamily} 
          localKey={localKey}
          showKey={{
            columnOrgName: 'familyName',
            mineFlag: 'myFamily',
            pkValue: 'familyId',
            serachName: '选择对比组织'
          }}/>
        </BIDrawer>
      </div>
    );
  }
}
export default FamilyIndex;
