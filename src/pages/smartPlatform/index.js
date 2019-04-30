import React from 'react';
import { connect } from 'dva';

@connect(({ home, loading }) => ({
  home,
  loading: loading.models.survey,
  isLoading: loading.effects['home/getExamDateRange'],
}))
class Home extends React.Component {
  componentDidMount() {
    // this.getDateRange();
    this.getOrgInfo()
  }
  getOrgInfo = () => {
    this.props.dispatch({
      type: 'home/getOrgInfo',
    });
  };
  getDateRange = () => {
    this.props.dispatch({
      type: 'home/getExamDateRange',
    });
  };
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }

}

export default Home;
