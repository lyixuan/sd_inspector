import React from 'react';
import { connect } from 'dva';
import { setLocalValue } from '@/pages/indexPage/components/utils/utils';
import BIDrawer from '@/components/BIDrawer';
import { message } from 'antd/lib';
import PkDrawer from './pkDrawer';
import PkResult from './pkResult';
import styles from './style.less';

const { BI = {} } = window;
const localKey = 'incomeGroupLocal';
@connect(({ incomeRankModal, loading }) => ({
  groupPkList: incomeRankModal.groupIncomeList,
  groupPkDrawer: incomeRankModal.groupIncomeDrawer,
  dimenloading: loading.effects['incomeRankModal/getIncomeFamilyGroupPk'],
  drawerloading: loading.effects['incomeRankModal/getIncomeGroupList'],
}))
class FamilyIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.getLocalValue(),
      visible: false
    }
  }
  componentDidMount() {
    this.getResulitList();
  }
  // 初始化数据
  getLocalValue = () => {
    const {pkUsers = [] } = JSON.parse(localStorage.getItem(localKey)) || {};
    return { 
      pkUsers, // 选中的pk者
    };
  }
  // 对比列表
  getResulitList = () => {
    this.props.dispatch({
      type: 'incomeRankModal/getIncomeFamilyGroupPk',
      payload: { params: { pkIds: this.state.pkUsers } },
    });
  }
  // pk者列表
  getGroupList = ({ collegeId }, callback) => {
    this.props.dispatch({
      type: 'incomeRankModal/getIncomeGroupList',
      payload: { params: { collegeId } },
      callback: (res) => callback(res)
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
        BI.traceV &&  BI.traceV({"widgetName": "创收-删除PK小组","traceName": "家族长工作台/创收-删除PK小组"})
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
  toggleDrawer = (bul) => {
    if (bul) {
      BI.traceV &&  BI.traceV({"widgetName":"创收-展开PK小组","traceName":"家族长工作台/创收-展开PK小组"});
    }
    this.setState({
      visible: bul,
    });
  };

  render() {
    const { pkUsers, visible } = this.state;
    const { groupPkList, groupPkDrawer, dimenloading, drawerloading } = this.props; 
    return (
      <div className={styles.container}>
        <PkResult 
        handleDelete={this.handleDelete} 
        toggleDrawer={this.toggleDrawer}
        loading={dimenloading}
        profitData={groupPkList}
        pkUsers={pkUsers}
        incomeType='小组'
        />
        <BIDrawer
          onClose={() => this.toggleDrawer(false)}
          onOpen={() => this.toggleDrawer(true)}
          closeValue='收起PK对象'
          openValue='展开PK对象'
          visible={visible}
          drawerStyle={{width: '48%'}}
          propsStyle={{padding: 0}}
        >
          <PkDrawer 
          changeSelected={this.changeSelected} 
          handleAction={this.handleAction}
          getDrawerList={this.getGroupList}
          drawerList={groupPkDrawer}
          dimenloading={dimenloading}
          drawerloading={drawerloading}
          pkUsers={pkUsers} 
          localKey={localKey}
          showKey={{
            mineFlag: 'myGroup',
            incomeType: '小组'
          }}
          />
        </BIDrawer>
      </div>
    );
  }
}

export default FamilyIndex;
