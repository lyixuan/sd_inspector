import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { setLocalValue } from '@/pages/indexPage/components/utils/utils';
import { message } from 'antd/lib/index';
import BIButton from '@/ant_components/BIButton';
import BIDrawer from '@/components/BIDrawer';
import Container from '@/components/BIContainer';
import CurrentCreditRight from './currentCreditRight';
import CurrentCreditLeft from './currentCreditLeft';
import closeImg from '@/assets/xdFamily/closeeye.png';
import showImg from '@/assets/xdFamily/eye.png';
import { handleDataTrace } from '@/utils/utils';
import styles from './style.less';

const { BI = {} } = window;
const localKey = 'creditWorkLocal';
@connect(({ xdClsssModal, loading }) => ({
  kpiTimes: xdClsssModal.kpiTimes || {},
}))
class currentCredit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false, // 抽屉切换
      ...this.getLocalValue(), 
    }
  }
  componentDidMount() {
    // 小组-绩效列表
    this.props.dispatch({
      type: 'xdWorkModal/getKpiLevelList',
    });
  }
  // 初始化数据
  getLocalValue = () => {
    const {pkGroupList = [], hasData} = JSON.parse(localStorage.getItem(localKey)) || {};
    return { 
      pkGroupList, // 选中PK数组
      hasData: hasData && hasData === 2 ? false : true // 学分基础信息切换显示
    };
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
    setLocalValue({ pkGroupList }, localKey);
    this.setState({ pkGroupList: [...pkGroupList] });
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
  // 隐藏数据
  getNumValue = (n, s = 160) => {
    if(!this.state.hasData) return n - s;
    return n;
  }

  render() {
    const { pkGroupList, visible, hasData } = this.state;
    const { startTime, endTime } = this.props.kpiTimes;
    return (
      <Container
        title='本期学分'
        style={{ width: '100%', marginBottom: '16px', position: 'relative' }}
        right={
          <>
            <BIButton onClick={() => handleDataTrace({"widgetName":"消息差评快捷入口","traceName":"班主任工作台/消息差评入口"})} type="online" style={{marginRight: '8px'}}><Link to={`/xdCredit/index?params=${JSON.stringify({startTime, endTime, "dementionId": 16 }) }`} target='_black'>IM差评快捷入口</Link></BIButton>
            <BIButton onClick={this.toggleData} type="online"><img style={{width: '16px', marginRight: '8px'}} src={ hasData ? showImg : closeImg} alt='icon'/>{hasData ? '隐藏' : '显示'}基础信息</BIButton>
          </>
        }
      >
        <div className={styles.creditContainer}>
          <CurrentCreditLeft 
            toggleDrawer={this.toggleDrawer} 
            changePkFn={this.clickRow}
            hasData={hasData}
            pkGroupList={pkGroupList}
            getNumValue={this.getNumValue}
          />
          <BIDrawer
          onClose={() => this.toggleDrawer(false)}
          onOpen={() => this.toggleDrawer(true)}
          visible={visible}
          drawerStyle={{width: '40%'}}
          >
            <CurrentCreditRight 
            hasData={hasData} 
            pkGroupList={pkGroupList} 
            clickRow={this.clickRow} 
            getNumValue={this.getNumValue}
            localKey={localKey}
            />
          </BIDrawer>
        </div>
      </Container>
    );
  }
}

export default currentCredit;
