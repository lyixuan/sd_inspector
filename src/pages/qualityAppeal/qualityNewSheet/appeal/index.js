import React from 'react';
import { connect } from 'dva';
import { Spin,Icon } from 'antd';
import BaseDetail from '@/pages/qualityAppeal/components/BaseDetail';
import BIModal from '@/ant_components/BIModal';
import styles from './style.less';
import FormIndex from '@/pages/qualityAppeal/components/BaseForm/index';
import QualityNewSheetAppealSt from '@/pages/qualityAppeal/components/QualityNewSheetInfo/AppealSt';

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
    }).then((res)=>{
      if(res){
        this.setState({
          visible:false
        });
        this.getQualityDetailData();
      }
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
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
          <QualityNewSheetAppealSt {...this.props} qualityDetailData={QualityDetailData}/>
        </div>
        <BIModal
          title="编辑质检信息"
          width={1200}
          style={{top:0}}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          destroyOnClose
          footer={null}
        >
          <FormIndex backType="closeModal"
                     params={{ ...others }}
                     onCancel={this.handleCancel}
                     onSubmit={this.onSubmit}/>
        </BIModal>
      </Spin>
    );
  }
}

export default QualityAppeal;
