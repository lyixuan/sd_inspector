import React from 'react';
import { connect } from 'dva';
import styles from './style.less';

@connect(({ loading}) => ({
  loading: loading.effects['xdWorkModal/getCountAppealRecord'],
}))
class Dimension extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    // this.props.dispatch({
    //   type: 'xdWorkModal/getCountAppealRecord',
    //   payload: { params: { id: this.props.userId } },
    //   callback: (appealList) => this.setState({ appealList }),
    // });
  }
  render() {
    return (
      <div>1111</div>
    );
  }
}

export default Dimension;
