import React from 'react';
import Container from '../../components/container';
import ProfitList from './components/list';
import ProfitTabs from './components/tabs';
import BIDrawer from '@/components/BIDrawer';


class Profit extends React.Component {
  constructor(props) {
    super(props);
    const pkUsers = localStorage.getItem('pkUsers');
    const pkListType = localStorage.getItem('pkListType');
    this.state = {
      pkUsers: pkUsers ? JSON.parse(pkUsers) : [], // 选中的pk者
      pkListType: pkListType ? Number(pkListType) : 5, // 列表选项--同级排行
      visible: false
    }
  }
  // PK数组
  changeSelected = (id) => {
    const { pkUsers } = this.state;
    if (pkUsers instanceof Array) {
      if (pkUsers.includes(id)) {
        pkUsers.splice(pkUsers.indexOf(id), 1);
      } else {
        pkUsers.push(id);
      }
    }
    localStorage.setItem('pkUsers', JSON.stringify(pkUsers));
    this.setState({ pkUsers: [...pkUsers] });
  }
  // 对比小组筛选条件
  changePkListType = (v) => {
    localStorage.setItem('pkListType', v);
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
        <ProfitTabs {...this.props} pkUsers={pkUsers} pkListType={pkListType} changeSelected={this.changeSelected}/>
        <BIDrawer
          onClose={() => this.toggleDrawer(false)}
          onOpen={() => this.toggleDrawer(true)}
          visible={visible}
          drawerStyle={{width: '40%'}}
        >
          <ProfitList {...this.props} pkUsers={pkUsers} pkListType={pkListType} changePkListType={this.changePkListType} changeSelected={this.changeSelected} />
        </BIDrawer>
      </Container>
    );
  }
}

export default Profit;
