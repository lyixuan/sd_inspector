import React from 'react';
import Container from '../../components/container';
import ProfitList from './components/list';
import ProfitTabs from './components/tabs';

class Profit extends React.Component {
  constructor(props) {
    super(props);
    const pkUser = localStorage.getItem('pkUser');
    this.state = {
      pkUser: pkUser ? Number(pkUser) : '', // 选中的pk者
      pkListType: 5, // 列表选项--同级排行
    }
  }

  changeSelected = (id) => {
    localStorage.setItem('pkUser', id);
    this.setState({ pkUser: id });
  }
  changePkListType = (v) => {
    this.setState({ pkListType: v });
  }

  render() {
    const { pkUser, pkListType } = this.state;
    return (
      <Container title='本期创收' propStyle={{ display: 'flex' }}>
        <ProfitTabs {...this.props} pkUser={pkUser} pkListType={pkListType} />
        <ProfitList {...this.props} pkUser={pkUser} pkListType={pkListType} changePkListType={this.changePkListType} changeSelected={this.changeSelected} />
      </Container>
    );
  }
}

export default Profit;
