import React from 'react';
import styles from './style.less';
import { connect } from 'dva';
import { Spin } from 'antd';
import BaseDetail from '@/pages/qualityAppeal/components/BaseDetail';

@connect(({ qualityNewSheet, loading }) => ({
  qualityNewSheet,
  pageLoading: loading.effects['qualityNewSheet/getQualityDetail']
}))
class QualityDetail extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { location: { query }} = this.props;
    this.props.dispatch({
      type: 'qualityNewSheet/getQualityDetail',
      payload: query,
    });
  }

  render() {
    const { qualityDetail = {} } = this.props.qualityNewSheet;
    const { qualityAudit, ...others } = qualityDetail;
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
