import React from 'react';
import { connect } from 'dva';
import BIButton from '@/ant_components/BIButton';
import BIModal from '@/ant_components/BIModal';
import styles from './style.less';
import CommonForm from '../../components/commonForm';
import QualityAppeal from '../../components/AppealInfo/qualityAppeal';
import { message,Spin } from 'antd';
@connect(({ loading, qualityNewSheet, editQualityNewSheet }) => ({
  loading,
  qualityNewSheet,
  editQualityNewSheet,
  submitLoading: loading.effects['editQualityNewSheet/checkQuality'],
  pageLoading: loading.effects['qualityNewSheet/getQualityDetail']
}))
class EditQualityNewSheet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    const { query = {} } = this.props.location;
    this.query = query;
    this.appealParam={};
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
  setStateData = val => {
    this.appealParam = val;
  };
  onSubmit = params => {
    const { appealParam } = this;
    if (Number(appealParam.checkResult) !== 0 && !appealParam.checkResult) {
      message.warn('审核结果为必选项');
      return;
    }

    if (Number(appealParam.checkResult) === 1 && !appealParam.appealEndDate) {
      message.warn('一审截止日期必填');
      return;
    }
    const params2 = {
      qualityId: Number(this.query.id),
      checkResult: Number(appealParam.checkResult) === 1 ? 2 : 4,
      checkResultDesc: appealParam.desc ? appealParam.desc : undefined,
      firstAppealEndDate: appealParam.appealEndDate ? appealParam.appealEndDate : undefined,
    };
    this.props.dispatch({
      type: 'editQualityNewSheet/checkQuality',
      payload: { ...params, ...params2 },
    });
  };

  render() {
    const { qualityDetail = {} } = this.props.qualityNewSheet;
    const {  qualityAudit = [], ...others } = qualityDetail;
    const newqualityAudit = [];
    qualityAudit && qualityAudit.forEach((v) => {
      newqualityAudit.push({
        checkResult: v.operate === 4 ? 0 : v.operate === 2 ? 1 : '',
        operator: null,
        operateDate: v.updateTime,
        desc: v.desc
      })
    });
    return (
      <Spin spinning={this.props.pageLoading}>
        <div className={styles.qualityContainter}>
          {/* form区域 */}
          <CommonForm {...this.props} onSubmit={this.onSubmit} dataSource={{ ...others }} formType="quality" actionType="appeal">
            <QualityAppeal data={newqualityAudit} formType="quality" setStateData={this.setStateData} />
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
