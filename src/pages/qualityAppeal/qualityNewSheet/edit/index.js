import React from 'react';
import { connect } from 'dva';
import { Spin } from 'antd';
import BIButton from '@/ant_components/BIButton';
import BIModal from '@/ant_components/BIModal';
import styles from './style.less';
import CommonForm from '../../components/commonForm';
import QualityAppeal from '../../components/AppealInfo/qualityAppeal';

@connect(({ loading, qualityNewSheet, editQualityNewSheet }) => ({
  loading,
  qualityNewSheet,
  editQualityNewSheet,
  submitLoading: loading.effects['editQualityNewSheet/updateQuality'],
  pageLoading: loading.effects['qualityNewSheet/getQualityDetail']
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
    this.props.dispatch({
      type: 'editQualityNewSheet/updateQuality',
      payload: { ...params },
    });
  };

  render() {
    const { qualityDetail = {} } = this.props.qualityNewSheet;
    const { qualityAudit, ...others } = qualityDetail;
    const newqualityAudit = [];
    qualityAudit &&
      qualityAudit.forEach(v => {
        newqualityAudit.push({
          checkResult: v.operate === 4 ? 0 : 1,
          operator: null,
          operateDate: v.updateTime,
          desc: v.desc,
        });
      });
    return (
      <Spin spinning={this.props.pageLoading}>
        <div className={styles.qualityContainter}>
          {/* form区域 */}
          <CommonForm {...this.props} onSubmit={this.onSubmit} dataSource={{ ...others }} formType="quality" actionType="edit">
            {newqualityAudit.length>0&&(<QualityAppeal data={newqualityAudit} />)}
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
      </Spin>
    );
  }
}

export default EditQualityNewSheet;
