import React from 'react';
import Container from '../../components/container';
import ProfitList from './components/list';
import ProfitTabs from './components/tabs';
import { Drawer } from 'antd';

class Profit extends React.Component {
  constructor(props) {
    super(props);
    const pkUser = localStorage.getItem('pkUser');
    const pkListType = localStorage.getItem('pkListType');
    this.state = {
      pkUser: pkUser ? Number(pkUser) : '', // 选中的pk者
      pkListType: pkListType ? Number(pkListType) : 5, // 列表选项--同级排行
    }
  }

  changeSelected = (id) => {
    localStorage.setItem('pkUser', id);
    this.setState({ pkUser: id });
  }
  changePkListType = (v) => {
    localStorage.setItem('pkListType', v);
    this.setState({pkListType: v});
  }

  render() {
    const { pkUser, pkListType } = this.state;
    return (
      <Container title='本期创收' propStyle={{ display: 'flex' }}>
        <ProfitTabs {...this.props} pkUser={pkUser} pkListType={pkListType} />
        <Drawer
          title="Basic Drawer"
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
          getContainer={false}
          style={{ position: 'absolute' }}
        >
          <ProfitList {...this.props} pkUser={pkUser} pkListType={pkListType} changePkListType={this.changePkListType} changeSelected={this.changeSelected} />
        </Drawer>
      </Container>
    );
  }
}

export default Profit;
