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
  changeSelected = (id) => {
    const { pkUsers } = this.state;
    if (pkUsers instanceof Array) {
      pkUsers.push(id);
    } else {
      pkUsers = [id];
    }
    localStorage.setItem('pkUsers', JSON.stringify(pkUsers));
    this.setState({ pkUsers });
  }
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
      <Container title='本期创收' propStyle={{ display: 'flex', height: '540px', position: 'relative' }}>
        <ProfitTabs {...this.props} pkUsers={pkUsers} pkListType={pkListType} />
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
