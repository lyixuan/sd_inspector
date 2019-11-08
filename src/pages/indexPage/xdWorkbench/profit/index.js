import React from 'react';
import { setLocalValue } from '@/pages/indexPage/components/utils/utils';
import Container from '@/components/BIContainer';
import ProfitList from './components/list';
import ProfitTabs from './components/tabs';
import BIDrawer from '@/components/BIDrawer';
import { message } from 'antd/lib/index';
import { connect } from 'dva';

const { BI = {} } = window;
const localKey = 'incomeWorkLocal';
@connect(({ xdClsssModal, loading }) => ({
  groupIncomePk: xdClsssModal.groupIncomePk,
  resultloading: loading.effects['xdClsssModal/getContrastIncomeKpiPkList'],
}))
class Profit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      ...this.getLocalValue()
    }
  }
  componentDidMount() {
    this.getResulitList()
  }
  // 初始化数据
  getLocalValue = () => {
    const { pkUsers = [], pkListType = 3} = JSON.parse(localStorage.getItem(localKey)) || {};
    return {
      pkUsers, // 选中PK数组
      pkListType: pkListType // 学分基础信息切换显示
    };
  }  
  getResulitList = () => {
    this.props.dispatch({
      type: 'xdClsssModal/getContrastIncomeKpiPkList',
      payload: { params: { pkUsers: this.state.pkUsers } }
    });
  }
  // 操作 确定  清空
  handleAction = pkUsers => {
    if (pkUsers) {
      setLocalValue({ pkUsers }, localKey);
      this.setState({ pkUsers }, () => this.getResulitList());
    } else {
      setLocalValue({ pkUsers: this.state.pkUsers }, localKey);
      this.getResulitList();
    }
  }
  // 删除
  handleDelete = id => {
    this.changeSelected(id, this.handleAction)
  }
  // PK数组
  changeSelected = (id, callback) => {
    const { pkUsers } = this.state;
    if (pkUsers instanceof Array) {
      if (pkUsers.includes(id)) {
        BI.traceV &&  BI.traceV({"widgetName":"本期创收-删除pk对象按钮","traceName":"小德工作台/本期创收/删除pk对象按钮"})
        pkUsers.splice(pkUsers.indexOf(id), 1);
      } else {
        if (pkUsers.length >= 5) {
          message.error('最多选择5个pk对象');
          return;
        };
        pkUsers.push(id);
      }
    }
    this.setState({ pkUsers: [...pkUsers] }, () => {
      if (callback && typeof callback === 'function') {
        callback();
      }
    });
  }
  // 对比小组筛选条件
  changePkListType = (v) => {
    setLocalValue({ pkListType: v }, localKey);
    this.setState({pkListType: v});
  }
  toggleDrawer = (bul) => {
    this.setState({
      visible: bul,
    });
  };

  render() {
    const { pkUsers, pkListType, visible } = this.state;
    const { resultloading } = this.props;
    return (
      <Container 
      title='本期创收' 
      // right={<a>创收详情</a>}
      propStyle={{ display: 'flex', height: '440px', position: 'relative' }}
      >
        <ProfitTabs 
        pkUsers={pkUsers} 
        toggleDrawer={this.toggleDrawer}
        handleDelete={this.handleDelete}
        loading={resultloading}
        profitData={this.props.groupIncomePk}
        {...this.props} 
        />
        <BIDrawer
          onClose={() => this.toggleDrawer(false)}
          onOpen={() => this.toggleDrawer(true)}
          visible={visible}
          drawerStyle={{width: '42%'}}
          closeValue='收起PK对象'
          openValue='展开PK对象'
        >
          <ProfitList 
          pkUsers={pkUsers} 
          pkListType={pkListType}
          changePkListType={this.changePkListType} 
          changeSelected={this.changeSelected} 
          handleAction={this.handleAction}
          resultloading={resultloading}
          {...this.props}
          />
        </BIDrawer>
      </Container>
    );
  }
}

export default Profit;
