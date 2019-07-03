import React from 'react';
import styles from './style.less';
import { connect } from 'dva';
import { Spin } from 'antd';
import BaseInfo from '../../components/BaseInfo';
import router from 'umi/router';
import BIButton from '@/ant_components/BIButton/index';

@connect(({ scoreAppealModel,loading }) => ({
  scoreAppealModel,
  loading: loading.effects['scoreAppealModel/queryBaseAppealInfo'],
}))

class AppealAwaitCheck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse1: true,
      collapse2: true,
    };
  }
  componentDidMount() {
    const {query={}} = this.props.location;
    this.props.dispatch({
      type: 'scoreAppealModel/queryBaseAppealInfo',
      payload: { params:{dimensionId:query.dimensionId,dimensionType:query.dimensionType}  },
    });
  }
  render() {
    const {loading,scoreAppealModel={}}=this.props;
    const {query={}} = this.props.location;
    const {detailInfo={}}=scoreAppealModel;
    return (
      <Spin spinning={loading}>
      <div className={styles.appealContainer}>
        <BaseInfo detailInfo={detailInfo} dimensionType={query.dimensionType}/>
        <footer style={{ textAlign: 'right', marginTop: '20px' }}>
          <BIButton onClick={() => router.goBack()}>返回</BIButton>
        </footer>
      </div>
      </Spin>
    );
  }
}

export default AppealAwaitCheck;
