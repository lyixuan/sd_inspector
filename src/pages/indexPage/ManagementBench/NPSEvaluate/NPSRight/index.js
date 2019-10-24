import React from 'react';
import { connect } from 'dva';

@connect((xdWorkModal) => ({
  xdWorkModal,
}))
class NPSLeft extends React.Component {
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
      <div style={{ width: 'calc(40% - 16px)',height:"372px" }}>

      </div>
    );
  }
}

export default NPSLeft;
