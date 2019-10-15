import React from 'react';
import { connect } from 'dva';
import { Spin } from 'antd';
import BaseDetail from '@/pages/qualityAppeal/components/BaseDetail';
import styles from './style.less';

@connect(({ loading, qualityAppealHome }) => ({
  loading,
  qualityAppealHome,
  pageLoading: loading.effects['qualityAppealHome/getQualityDetailData']
}))
class QualityAppeal extends React.Component {
  componentDidMount() {
    this.getQualityDetailData();
  }

  getQualityDetailData = () => {
    const { location: { query }, } = this.props;
    this.props.dispatch({
      type: 'qualityAppealHome/getQualityDetailData',
      payload: query,
    });
  };

  render() {
    const { QualityDetailData = {} } = this.props.qualityAppealHome;
    const { qualityAudit, ...others } = QualityDetailData;

    return (
      <Spin spinning={this.props.pageLoading}>
        <div className={styles.qualityContainter}>
          {/* 质检单详情 */}
          <BaseDetail data={{...others}}/>
          <div>编辑违规信息</div>
          {/* 审核详情 */}

        </div>
      </Spin>
    );
  }
}

export default QualityAppeal;
