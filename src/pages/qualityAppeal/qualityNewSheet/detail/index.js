import React from 'react';
import styles from './style.less';
import { connect } from 'dva';
import { Spin } from 'antd';
import BaseDetail from '@/pages/qualityAppeal/components/BaseDetail';
import QualityNewSheetDetail from '@/pages/qualityAppeal/components/QualityNewSheetInfo/Detail';

@connect(({ qualityAppealHome, loading }) => ({
  qualityAppealHome,
  pageLoading: loading.effects['qualityAppealHome/getQualityDetailData'],
}))
class QualityDetail extends React.Component {
  componentDidMount() {
    const {
      location: { query },
    } = this.props;
    this.props.dispatch({
      type: 'qualityAppealHome/getQualityDetailData',
      payload: query,
    });
  }

  render() {
    const { QualityDetailData = {} } = this.props.qualityAppealHome;
    const { qualityAudit, ...others } = QualityDetailData;
     // 转换字段
     QualityDetailData.qualityValue = QualityDetailData.ownQualityValue;
    return (
      <Spin spinning={this.props.pageLoading}>
        <div className={styles.qualityContainter}>
          {/* 质检单详情 */}
          <BaseDetail data={{ ...others }} />
          <QualityNewSheetDetail qualityDetailData={QualityDetailData} />
        </div>
      </Spin>
    );
  }
}

export default QualityDetail;
