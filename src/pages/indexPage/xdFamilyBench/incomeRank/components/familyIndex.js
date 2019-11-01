import React from 'react';
import { connect } from 'dva';
import { setLocalValue } from '@/pages/indexPage/components/utils/utils';
import PkDrawer from './pkDrawer';
import PkResult from './pkResult';
import BIDrawer from '@/components/BIDrawer';
import { message } from 'antd/lib/index';
import styles from './style.less';

const { BI = {} } = window;
const localKey = 'incomeFamilyLocal';
@connect(({ loading }) => ({
  dimenloading: loading.effects['xdFamilyModal/getIncomeFamilyList'],
  drawerloading: loading.effects['xdFamilyModal/getIncomeCollegeList'],
}))
class FamilyIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profitData: {},
      ...this.getLocalValue(),
      visible: false
    }
  }
  componentDidMount() {
    this.getResulitList();
  }
  // 初始化数据
  getLocalValue = () => {
    const {pkUsers = [], pkListType=3} = JSON.parse(localStorage.getItem(localKey)) || {};
    return { 
      pkUsers, // 选中的pk者
      pkListType, // 列表选项--同级排行
    };
  }
  // 对比列表
  getResulitList = () => {
    this.props.dispatch({
      type: 'xdFamilyModal/getIncomeFamilyList',
      payload: { params: { pkUsers: this.state.pkUsers } },
      callback: (profitData) => {
        if (profitData) this.setState({ profitData })
      },
    });
  }
  // pk者列表
  getGroupList = callback => {
    this.props.dispatch({
      type: 'xdFamilyModal/getIncomeCollegeList',
      payload: { params: { pkListType: this.state.pkListType } },
      callback: (profitList) => callback(profitList)
    });
  }
  // 抽屉操作
  handleAction = pkUsers => {
    if (pkUsers) {
      setLocalValue({ pkUsers }, localKey);
      this.setState({ pkUsers }, this.getResulitList());
    } else {
      this.getResulitList();
    }
  }
  // 抽屉筛选条件
  handleGroup = (callback, pkListType) => {
    if (pkListType) {
      setLocalValue({ pkListType }, localKey);
      this.setState({ pkListType }, this.getGroupList(callback));
    } else {
      this.getGroupList(callback);
    }
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
    this.setState({ pkUsers });
  }
  toggleDrawer = (bul) => {
    this.setState({
      visible: bul,
    });
  };

  render() {
    const { pkUsers, pkListType, visible, profitData } = this.state;
    return (
      <div className={styles.container}>
        <PkResult 
        changeSelected={this.changeSelected} 
        toggleDrawer={this.toggleDrawer}
        loading={this.props.dimenloading}
        profitData={profitData}
        pkListType={pkListType} 
        pkUsers={pkUsers}
        incomeType='家族' 
        />
        <BIDrawer
          onClose={() => this.toggleDrawer(false)}
          onOpen={() => this.toggleDrawer(true)}
          closeValue='收起PK对象'
          openValue='展开PK对象'
          visible={visible}
          drawerStyle={{width: '40%'}}
          propsStyle={{padding: 0}}
        >
          <PkDrawer 
          changeSelected={this.changeSelected} 
          handleGroup={this.handleGroup}
          handleAction={this.handleAction}
          dimenloading={this.props.dimenloading}
          drawerloading={this.props.drawerloading}
          pkListType={pkListType} 
          pkUsers={pkUsers} 
          />
        </BIDrawer>
      </div>
    );
  }
}

export default FamilyIndex;
