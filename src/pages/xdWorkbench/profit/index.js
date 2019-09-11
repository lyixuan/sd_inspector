import React from 'react';
import Container from '../components/container';
import ProfitList from './components/list';
import ProfitTabs from './components/tabs';

class Profit extends React.Component {
  constructor(props)  {
    super(props);
    this.state = {
      pkUser: '', // 选中的pk者
      pkListType: 5, // 列表选项--同级排行
    }
  }

  changeSelected = (id) => {
    this.setState({pkUser: id});
  }
  changePkListType = (v) => {
    this.setState({pkListType: v});
  }

  render() {
    return (
      <Container title='本期创收' propStyle={{display: 'flex'}}>
        <ProfitTabs {...this.props} {...this.state}/>
        <ProfitList {...this.props} {...this.state} changePkListType={this.changePkListType} changeSelected={this.changeSelected}/>
      </Container>
    );
  }
}

export default Profit;
