import React from 'react';
import { connect } from 'dva';
import styles from './style.less';
import { Spin } from 'antd';
import BaseDetail from '@/pages/qualityAppeal/components/BaseDetail';

@connect(({ qualityAppealing, qualityAppealHome,loading }) => ({
  qualityAppealing,
  qualityAppealHome,
  submitLoading: loading.effects['qualityAppealing/reviewAppeal'],
  submitLoading2: loading.effects['qualityAppealing/sopAppeal'],
  pageLoading: loading.effects['qualityAppealing/getAppealInfo'] || loading.effects['qualityAppealHome/getQualityDetailData']
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
      type: 'qualityAppealHome/getQualityDetailData',
      payload: { id: this.query.id },
    });
  };
  render() {
    const {DetailData={}} = this.props.qualityAppealing||{};

    const {QualityDetailData={}} = this.props.qualityAppealHome||{};

    return (
      <Spin spinning={this.props.pageLoading}>
        <div className={styles.detailContainer}>
          {/*质检详情*/}
          <BaseDetail data={QualityDetailData}/>
          {/* 申诉信息 */}
          {/*{this.getAppealInfos(DetailData)}*/}
        </div>
      </Spin>
    );
  }
}

export default QualityAppealing;
