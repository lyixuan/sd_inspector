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
    this.getMapInfo();
    this.getDateRange({});
    this.getOrgInfo({})
  }
  getMapInfo = () => {
    this.props.dispatch({
      type: 'home/getMapInfo',
    })
  }
  getOrgInfo = params => {
    this.props.dispatch({
      type: 'home/getOrgInfo',
      payload: params,
    });
  };
  getDateRange = params => {
    this.props.dispatch({
      type: 'home/getExamDateRange',
      payload: params,
    });
  };
  render() {
    return (
      <div className={styles.basicWrap}>
        <div className={styles.headerWrap} />
        {this.props.children}
      </div>
    );
  }

}

export default Home;
