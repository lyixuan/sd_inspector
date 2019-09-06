import React from 'react';
import { connect } from 'dva';
import Container from '../components/container';
import Proportion from '../components/proportion';
import ProfitList from './components/list';
import ProfitTabs from './components/tabs';

@connect(({ xdWorkModal, loading}) => ({

}))
class Profit extends React.Component {
  componentDidMount() {
    
  }

  render() {
    return (
      <Container title='本期创收' propStyle={{display: 'flex'}}>
        <ProfitTabs/>
        <ProfitList />
        <Proportion leftNum={5000} rightNum={1090}/>
      </Container>
    );
  }
}

export default Profit;
