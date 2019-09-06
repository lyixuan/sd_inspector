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
        <Proportion
        leftNum={10}
        rightNum={12}
        leftCollege={'自变量学院/111'}
        rightCollege={'自变量学院/111'}
        style={{width: '400px' }}
        // iconed={true}
        />
      </Container>
    );
  }
}

export default Profit;
