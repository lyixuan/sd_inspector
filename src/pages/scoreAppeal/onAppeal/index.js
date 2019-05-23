import React from 'react';
import RenderRoute from '@/components/RenderRoute';
import { connect } from 'dva/index';


@connect(({ scoreAppealModel,loading }) => ({
  scoreAppealModel,
  loading: loading.effects['qualityNewSheet/getQualityList'],
}))
class OnAppeal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
  }

  render() {
    return (
      <>
        <RenderRoute {...this.props}  />
      </>
    );
  }
}

export default OnAppeal;
