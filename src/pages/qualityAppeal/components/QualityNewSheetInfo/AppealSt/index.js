import React from 'react';
import { connect } from 'dva';
import BIButton from '@/ant_components/BIButton';
import BIModal from '@/ant_components/BIModal';
import styles from './style.less';
// import CommonForm from '../../components/commonForm';
import QualityAppeal from '../AppealInfo';
import { message, Spin } from 'antd';
import { BiFilter } from '@/utils/utils';
const confirm = BIModal.confirm;

@connect(({ loading, newQualityAppeal, qualityAppealHome }) => ({
  loading,
  qualityAppealHome,
  newQualityAppeal,
  submitLoading: loading.effects['newQualityAppeal/checkQuality'],
  pageLoading: loading.effects['qualityNewSheet/getQualityDetail'],
}))
class QualityNewSheetAppealSt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkResult: undefined,
      appealEndDate: undefined,
    };
    const { query = {} } = this.props.location;
    this.query = query;
    this.appealParam = {};
  }

  setStateData = val => {
    this.appealParam = val;
    this.setState({
      checkResult: val.checkResult === null ? null : Number(val.checkResult),
      appealEndDate: val.appealEndDate,
    });
  };
  handleCancel = () => {
    this.props.history.goBack();
  };
  onSubmit = params => {
    const { qualityDetailData = {} } = this.props;
    const { appealParam } = this;
    if (Number(appealParam.checkResult) !== 0 && !appealParam.checkResult) {
      message.warn('审核结果为必选项');
      return;
    }

    if (Number(appealParam.checkResult) === 1 && !appealParam.appealEndDate) {
      message.warn('一申截止日期必填');
      return;
    }
    const params2 = {
      qualityId: Number(this.query.id),
      checkResult: Number(appealParam.checkResult) === 1 ? 2 : 4,
      checkResultDesc: appealParam.desc ? appealParam.desc : undefined,
      firstAppealEndDate: appealParam.appealEndDate ? appealParam.appealEndDate : undefined,
    };
    console.log(params2, 'params2');
    this.props.dispatch({
      type: 'newQualityAppeal/checkQuality',
      payload: { ...qualityDetailData, ...params2 },
    });
  };

  render() {
    const { checkResult, appealEndDate } = this.state;
    const { qualityDetailData = {} } = this.props;
    const { qualityAudit = [], ...others } = qualityDetailData;
    const newqualityAudit = [];
    qualityAudit &&
      qualityAudit.forEach(v => {
        newqualityAudit.push({
          checkResult: v.operate === 4 ? 0 : v.operate === 2 ? 1 : '',
          operator: null,
          operateDate: v.updateTime,
          desc: v.desc,
        });
      });
    return (
      <div className={styles.qualityContainter}>
        <QualityAppeal data={newqualityAudit} formType="quality" setStateData={this.setStateData} />
        <div style={{ float: 'right' }}>
          <BIButton onClick={this.handleCancel} style={{ marginRight: 20 }}>
            取消
          </BIButton>
          <BIButton type="primary" onClick={this.onSubmit}>
            提交
          </BIButton>
        </div>
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

export default QualityNewSheetAppealSt;
