import React from 'react';
import { connect } from 'dva';
import styles from './style.less'

@connect(({ home, loading }) => ({
  home,
  loading: loading.models.survey,
  isLoading: loading.effects['home/getExamDateRange'],
}))
class Home extends React.Component {
  componentDidMount() {
    this.getDateRange();
    this.getOrgInfo({})
  }

  getOrgInfo = params => {
    this.props.dispatch({
      type: 'home/getOrgInfo',
      payload: params,
    });
  };
  getDateRange = () => {
    this.props.dispatch({
      type: 'home/getExamDateRange',
      payload: {},
    });
  };
  render() {
    console.log(this.props.home)
    return (
      <div className={styles.basicWrap}>
        <div className={styles.headerWrap} />
        {this.props.children}
      </div>
    );
  }

}

export default Home;
