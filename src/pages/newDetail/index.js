import React, { Component } from 'react';
import { connect } from 'dva';

@connect(({ newDetailModal }) => ({}))
class NewDetail extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'newDetailModal/getUserInfo',
      callback: res => {
        this.props.dispatch({
          type: 'newDetailModal/getCurrentDateRange',
          payload: { params: { userType: 'family' } },
        });
      },
    });
  }
  render() {
    return <></>;
  }
}

export default NewDetail;
