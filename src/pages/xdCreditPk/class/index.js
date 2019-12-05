import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { message } from 'antd/lib/index';
import { setLocalValue } from '@/pages/indexPage/components/utils/utils';
import BIButton from '@/ant_components/BIButton';
import Container from '@/components/BIContainer';
import BIDrawer from '@/components/BIDrawer';
import CurrentCreditRight from './currentCreditRight';
import CurrentCreditLeft from './currentCreditLeft';
import { handleDataTrace } from '@/utils/utils';
import qushiImg from '@/assets/qushibtn.png';
// import closeImg from '@/assets/xdFamily/closeeye.png';
// import showImg from '@/assets/xdFamily/eye.png';

const { BI = {} } = window;
const localKey = 'creditWorkLocal';
@connect(({ xdCreditPkModal, loading }) => ({
  groupPkList: xdCreditPkModal.classScorePk,
  dimenloading: loading.effects['xdCreditPkModal/groupPkClassList'],
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
    // this.getPkData()
  }
  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(nextProps.dateRangeSelect) !== JSON.stringify(this.props.dateRangeSelect)) {
      this.getPkData(nextProps.dateRangeSelect);
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
  getPkData = ([startTime, endTime] = this.props.dateRangeSelect) => {
    this.props.dispatch({
      type: 'xdCreditPkModal/groupPkClassList',
      payload: { params: { pkGroupList: this.state.pkGroupList, startTime, endTime } },
    })
  }
  handleAction = pkGroupList => {
    if (pkGroupList) {
      setLocalValue({ pkGroupList }, localKey);
      this.setState({ pkGroupList }, () => this.getPkData());
    } else {
      setLocalValue({ pkGroupList: this.state.pkGroupList }, localKey);
      this.getPkData();
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
  //     BI.traceV &&  BI.traceV({"widgetName":"本期学分-显示基础信息","traceName":"本期学分-显示基础信息"});
  //   } else {
  //     BI.traceV &&  BI.traceV({"widgetName":"本期学分-隐藏基础信息","traceName":"本期学分-隐藏基础信息"});
  //   }
  //   this.setState({
  //     hasData: hasData,
  //   });
  // };
  // 抽屉切换
  toggleDrawer = (bul) => {
    this.setState({
      visible: bul,
    });
  };
  render() {
    const { pkGroupList, visible } = this.state;
    const [startTime, endTime] = this.props.dateRangeSelect;
    const { dimenloading } = this.props;
    return (
      <Container
        style={{ position: 'relative' }}
        right={
          <>
            <BIButton onClick={() => handleDataTrace({"widgetName":"家族长学分pk页点趋势","traceName":"家族长工作台/学分pk页/学分趋势按钮"})} type="online" style={{marginRight: '8px'}}><Link to={`/xdCredit/index?params=${JSON.stringify({startTime, endTime }) }`} target='_black'>
              <img src={qushiImg} alt='' style={{ width: 15, marginRight: 6, marginTop: '-2px'}}/>
              学分趋势
            </Link></BIButton>
            <BIButton onClick={() => handleDataTrace({"widgetName":"消息差评快捷入口","traceName":"班主任工作台/消息差评入口"})} type="online" style={{marginRight: '8px'}}><Link to={`/xdCredit/index?params=${JSON.stringify({startTime, endTime, "dementionId": 16 }) }`} target='_black'>IM差评快捷入口</Link></BIButton>
            {/* <BIButton onClick={this.toggleData} type="online"><img style={{width: '16px', marginRight: '8px'}} src={ hasData ? showImg : closeImg} alt='icon'/>{hasData ? '隐藏' : '显示'}基础信息</BIButton> */}
          </>
        }
      >
        <CurrentCreditLeft 
            toggleDrawer={this.toggleDrawer}
            handleDelete={this.handleDelete} 
            // hasData={hasData}
            pkGroupList={pkGroupList}
            loading={dimenloading}
            groupPkList={this.props.groupPkList}
          />
          <BIDrawer
          onClose={() => this.toggleDrawer(false)}
          onOpen={() => this.toggleDrawer(true)}
          visible={visible}
          drawerStyle={{width: '42%'}}
          >
            <CurrentCreditRight 
            pkGroupList={pkGroupList} 
            clickRow={this.clickRow} 
            localKey={localKey}
            handleAction={this.handleAction}
            dimenloading={dimenloading}
            dateRangeSelect={this.props.dateRangeSelect}
            />
          </BIDrawer>    
      </Container>
    );
  }
}

export default currentCredit;
