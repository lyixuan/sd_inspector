import React from 'react';
import Container from '../components/container';
import ProfitList from './components/list';
import ProfitTabs from './components/tabs';

class Profit extends React.Component {
  constructor(props)  {
    super(props);
    this.state = {
      pkUser: 6,
    }
  }

  changeSelected = (id) => {
    this.setState({pkUser: id});
  }

  render() {
    const { pkUser } = this.state;
    return (
      <Container title='本期创收' propStyle={{display: 'flex'}}>
        <ProfitTabs {...this.props} pkUser={pkUser}/>
        <ProfitList {...this.props} pkUser={pkUser} changeSelected={this.changeSelected}/>
      </Container>
    );
  }
}

export default Profit;
