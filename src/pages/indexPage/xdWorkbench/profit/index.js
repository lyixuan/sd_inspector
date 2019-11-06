import React from 'react';
import { setLocalValue } from '@/pages/indexPage/components/utils/utils';
import Container from '@/components/BIContainer';
import ProfitList from './components/list';
import ProfitTabs from './components/tabs';
import BIDrawer from '@/components/BIDrawer';
import { message } from 'antd/lib/index';

const { BI = {} } = window;
const localKey = 'incomeWorkLocal'
class Profit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      ...this.getLocalValue()
    }
  }
  // 初始化数据
  getLocalValue = () => {
    const {pkUsers = [], pkListType = 3} = JSON.parse(localStorage.getItem(localKey)) || {};
    return {
      pkUsers, // 选中PK数组
      pkListType: pkListType // 学分基础信息切换显示
    };
  }
  // PK数组
  changeSelected = (id) => {
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
    setLocalValue({ pkUsers }, localKey);
    this.setState({ pkUsers: [...pkUsers] });
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
    return (
      <Container 
      title='本期创收' 
      // right={<a>创收详情</a>}
      propStyle={{ display: 'flex', height: '540px', position: 'relative' }}
      >
        <ProfitTabs {...this.props} pkUsers={pkUsers} pkListType={pkListType} changeSelected={this.changeSelected} toggleDrawer={this.toggleDrawer}/>
        <BIDrawer
          onClose={() => this.toggleDrawer(false)}
          onOpen={() => this.toggleDrawer(true)}
          visible={visible}
          drawerStyle={{width: '40%'}}
        >
          <ProfitList {...this.props} pkUsers={pkUsers} pkListType={pkListType} changePkListType={this.changePkListType} changeSelected={this.changeSelected} {...this.props}/>
        </BIDrawer>
      </Container>
    );
  }
}

export default Profit;
