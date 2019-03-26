import React from 'react';
import { connect } from 'dva';
import BIButton from '@/ant_components/BIButton';
import BIModal from '@/ant_components/BIModal';
import styles from './style.less';
import CommonForm from '../../components/commonForm';
import QualityAppeal from '../../components/appealInfo/qualityAppeal';
import { message } from 'antd/lib/index';

@connect(({ loading, qualityNewSheet, editQualityNewSheet }) => ({
  loading,
  qualityNewSheet,
  editQualityNewSheet,
}))
class EditQualityNewSheet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    const { query = {} } = this.props.location;
    this.query = query;
  }
  componentDidMount() {
    this.getQualityDetailData();
  }
  getQualityDetailData = () => {
    const {
      location: { query },
    } = this.props;
    this.props.dispatch({
      type: 'qualityNewSheet/getQualityDetail',
      payload: query,
    });
  };
  onSubmit = params => {
    console.log(params);
    this.props.dispatch({
      type: 'editQualityNewSheet/updateQuality',
      payload: { ...params, familyType: 1 },
    });
  };

  render() {
    const { qualityDetail = {} } = this.props.qualityNewSheet;
    const { orderDetail, qualityAudit, ...others } = qualityDetail;
    const newqualityAudit = [];
    qualityAudit &&
      qualityAudit.forEach(v => {
        newqualityAudit.push({
          checkResult: v.operate === 4 ? 0 : 1,
          operator: v.operateId,
          operateDate: v.updateTime,
          desc: v.desc,
        });
      });
    return (
      <div className={styles.qualityContainter}>
        {/* form区域 */}
        <CommonForm {...this.props} onSubmit={this.onSubmit} dataSource={{ ...others }}>
          <QualityAppeal data={newqualityAudit} />
        </CommonForm>
        <BIModal
          title="提交确认"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <BIButton style={{ marginRight: 10 }} onClick={this.handleCancel}>
              取消
            </BIButton>,
            <BIButton type="primary" onClick={this.handleOk}>
              确定
            </BIButton>,
          ]}
        >
          <div className={styles.modalWrap}>该条记录将被提交给质检主管进行审核，确定提交吗？</div>
        </BIModal>
      </div>
    );
  }
}

export default EditQualityNewSheet;
