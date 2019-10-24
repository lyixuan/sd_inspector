import React from 'react';
import { connect } from 'dva';
// import styles from './style.less'
import Container from '@/components/BIContainer/index';
@connect((xdWorkModal) => ({
  xdWorkModal,
}))
class IMPartLeft extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  componentDidMount() {
  }
  render() {
    // const { userId} = this.state;
    return (
      <Container title="IM负面原因分析"
                 style={{ width: '60%', marginBottom: '16px' }}>

      </Container>
    );
  }
}

export default IMPartLeft;
