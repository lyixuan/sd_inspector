import React from 'react';
import { connect } from 'dva';
import { Spin,Icon } from 'antd';
import BaseDetail from '@/pages/qualityAppeal/components/BaseDetail';
import BIModal from '@/ant_components/BIModal';
import styles from './style.less';
import BIButton from '@/ant_components/BIButton';
import FormIndex from '@/pages/qualityAppeal/components/BaseForm/index';

@connect(({ loading, qualityNewSheet,qualityAppealHome }) => ({
  loading,
  qualityNewSheet,
  qualityAppealHome,
  pageLoading: loading.effects['qualityAppealHome/getQualityDetailData']
}))
class QualityAppeal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible:false
    }
  }

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

  edit = ()=>{
    this.setState({
      visible:true
    })
  };

  onSubmit = params => {
    this.props.dispatch({
      type: 'qualityNewSheet/updateQuality',
      payload: { ...params },
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
          <div className={styles.editButton} onClick={this.edit}><Icon type="edit" /> 编辑违规信息</div>
          {/* 审核详情 */}
        </div>
        <BIModal
          title="编辑质检信息"
          width={1200}
          visible={this.state.visible}
        >
          <FormIndex params={{ ...others }}
                     onSubmit={this.onSubmit}/>
        </BIModal>
      </Spin>
    );
  }
}

export default QualityAppeal;
