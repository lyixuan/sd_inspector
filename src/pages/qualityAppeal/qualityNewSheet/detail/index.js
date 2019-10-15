import React from 'react';
import styles from './style.less';
import { connect } from 'dva';
import { Spin } from 'antd';
import BaseDetail from '@/pages/qualityAppeal/components/BaseDetail';

@connect(({ qualityAppealHome, loading }) => ({
  qualityAppealHome,
  pageLoading: loading.effects['qualityAppealHome/getQualityDetailData']
}))
class QualityDetail extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { location: { query }} = this.props;
    this.props.dispatch({
      type: 'qualityAppealHome/getQualityDetailData',
      payload: query,
    });
  }

  render() {
    const { QualityDetailData = {} } = this.props.qualityAppealHome;
    const { qualityAudit, ...others } = QualityDetailData;
    return (
      <Spin spinning={this.props.pageLoading}>
        <div className={styles.qualityContainter}>
          {/* 质检单详情 */}
          <BaseDetail data={{...others}}/>

        </div>
      </Spin>
    );
  }
}

export default QualityDetail;
