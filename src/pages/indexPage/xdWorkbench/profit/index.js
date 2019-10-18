import React from 'react';
import Container from '../../components/container';
import ProfitList from './components/list';
import ProfitTabs from './components/tabs';
import BIDrawer from '@/components/BIDrawer';

class Profit extends React.Component {
  constructor(props) {
    super(props);
    const pkUser = localStorage.getItem('pkUser');
    const pkListType = localStorage.getItem('pkListType');
    this.state = {
      pkUser: pkUser ? JSON.parse(pkUser) : [], // 选中的pk者
      pkListType: pkListType ? Number(pkListType) : 5, // 列表选项--同级排行
      visible: false
    }
  }
  changeSelected = (id) => {
    const pkUser = this.state.pkUser.push(id);
    localStorage.setItem('pkUser', JSON.stringify(pkUser));
    this.setState({ pkUser: pkUser });
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
    const { pkUser, pkListType, visible } = this.state;
    return (
      <Container title='本期创收' propStyle={{ display: 'flex', position: 'relative' }}>
        <ProfitTabs {...this.props} pkUser={pkUser} pkListType={pkListType} />
        <BIDrawer
          onClose={() => this.toggleDrawer(false)}
          onOpen={() => this.toggleDrawer(true)}
          visible={visible}
          drawerStyle={{width: '40%'}}
        >
          <ProfitList {...this.props} pkUser={pkUser} pkListType={pkListType} changePkListType={this.changePkListType} changeSelected={this.changeSelected} />
        </BIDrawer>
      </Container>
    );
  }
}

export default Profit;
