import React from 'react';
import styles from './style.less';
import { connect } from 'dva';
import { Spin } from 'antd';
import router from 'umi/router';
import BIButton from '@/ant_components/BIButton';
import BaseDetail from '@/pages/qualityAppeal/components/BaseDetail';
import AppealInfoDetail from '@/pages/qualityAppeal/components/AppealInfo/AppealInfoDetail';

@connect(({ appealDetail, qualityAppealHome, loading }) => ({
  appealDetail,
  qualityAppealHome,
  pageLoading:
    loading.effects['appealDetail/getDetailData'] ||
    loading.effects['qualityAppealHome/getQualityDetailData'],
}))
class AppealDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      params: {
        id: this.props.location.query.id || 1,
      },
    };
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'appealDetail/getDetailData',
      payload: this.state.params,
    });
    this.props.dispatch({
      type: 'qualityAppealHome/getQualityDetailData',
      payload: this.state.params,
    });
  }
  render() {
    const { DetailData = {} } = this.props.appealDetail;
    const { QualityDetailData = {} } = this.props.qualityAppealHome;
    const { qualityAudit, ...others } = QualityDetailData;
    return (
      <Spin spinning={this.props.pageLoading}>
        <div className={styles.detailContainer}>
          {/*质检详情*/}
          <BaseDetail data={QualityDetailData} />
          {/* 申诉信息 */}
          <AppealInfoDetail dataList={qualityAudit} />
          {/*{this.getAppealInfos(DetailData)}*/}
          <section style={{ textAlign: 'right', marginTop: '20px' }}>
            <BIButton onClick={() => router.goBack()}>返回</BIButton>
          </section>
        </div>
      </Spin>
    );
  }
}

export default AppealDetail;
