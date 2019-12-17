import React, { Component } from 'react';
import RenderRoute from '@/components/RenderRoute';
import { connect } from 'dva';

@connect(({ newDetailModal }) => ({}))
class NewDetail extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'newDetailModal/getUserInfo',
    });
    this.props.dispatch({
      type: 'newDetailModal/getCurrentDateRange',
      payload: { params: { userType: 'family' } },
    });
  }
  render() {
    return (
      <>
        <RenderRoute {...this.props} />
      </>
    );
  }
}

export default NewDetail;
