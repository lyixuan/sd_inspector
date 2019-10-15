import React from 'react';
import styles from './style.less';
import { Spin } from 'antd';
import BIButton from '@/ant_components/BIButton';
import { connect } from 'dva';
import router from 'umi/router';
import BaseDetail from '@/pages/qualityAppeal/components/BaseDetail';

@connect(({ Launch, qualityAppealHome, loading }) => ({
  Launch,
  qualityAppealHome,
  loading: loading.effects['Launch/launchAppeal'],
  pageLoading: loading.effects['qualityAppealHome/getDetailData'] || loading.effects['qualityAppealHome/getQualityDetailData']
}))
class Launch extends React.Component {
  constructor(props) {
    super(props);
    const { id = null } = props.location.query;
    this.state = {
      paramId: {
        id,
      },
    };
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'qualityAppealHome/getDetailData',
      payload: this.state.paramId,
    });
    this.props.dispatch({
      type: 'qualityAppealHome/getQualityDetailData',
      payload: this.state.paramId,
    });
  }
  render() {
    const{qualityAppealHome={}} = this.props;
    const {QualityDetailData={},DetailData={}} = qualityAppealHome;

    return (
      <Spin spinning={this.props.pageLoading}>
        <div className={styles.detailContainer}>
          {/*质检详情*/}
          <BaseDetail data={QualityDetailData}/>
          {/* 申诉信息 */}
          {/*{this.getAppealInfos(DetailData)}*/}
          <section style={{ textAlign: 'right', marginTop: '20px' }}>
            <BIButton onClick={() => router.goBack()}>返回</BIButton>
          </section>
        </div>
      </Spin>
    );
  }
}
