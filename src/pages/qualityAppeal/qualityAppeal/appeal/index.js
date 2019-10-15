import React from 'react';
import { connect } from 'dva';
import BIButton from '@/ant_components/BIButton';
import styles from './style.less';
import router from 'umi/router';
import { message, Spin } from 'antd';

@connect(({ qualityAppealing, qualityAppealHome, loading }) => ({
  qualityAppealing,
  orgList: qualityAppealHome.orgList,
  qualityAppealHome,
  submitLoading: loading.effects['qualityAppealing/reviewAppeal'],
  submitLoading2: loading.effects['qualityAppealing/sopAppeal'],
  pageLoading: loading.effects['qualityAppealing/getAppealInfo'] || loading.effects['qualityAppealing/getQualityDetailData']
}))
class QualityAppealing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    const { query = {} } = this.props.location;
    this.query = query;
  }
  componentDidMount() {
    this.getQualityInfo();
    this.getAppealInfo();
  }
  getAppealInfo = () => {
    this.props.dispatch({
      type: 'qualityAppealing/getAppealInfo',
      payload: { id: this.query.id },
    });
  };
  getQualityInfo = () => {
    this.props.dispatch({
      type: 'qualityAppealing/getQualityDetailData',
      payload: { id: this.query.id },
    });
  };
  render() {
    const {qualityAppealing={}} = this.props;
    const {QualityDetailData={},DetailData={}} = qualityAppealing;

    return (
      <Spin spinning={this.props.pageLoading}>
        <div className={styles.detailContainer}>
          {/*质检详情*/}

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

export default QualityAppealing;
