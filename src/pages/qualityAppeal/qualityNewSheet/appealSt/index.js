import React from 'react';
import { connect } from 'dva';
import BIButton from '@/ant_components/BIButton';
import BIModal from '@/ant_components/BIModal';
import styles from './style.less';
import CommonForm from '../../components/commonForm';
import QualityAppeal from '../../components/AppealInfo/qualityAppeal';
import { message } from 'antd/lib/index';

@connect(({ loading, qualityNewSheet, editQualityNewSheet }) => ({
  loading,
  qualityNewSheet,
  editQualityNewSheet,
}))
class EditQualityNewSheet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appealParam: {},
    };
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
  setStateData = val => {
    this.setState({
      appealParam: val,
    });
  };
  onSubmit = params => {
    const { appealParam } = this.state;
    if (!appealParam.checkResult) {
      message.warn('审核结果为必选项');
      return;
    }
    if (!appealParam.appealEndDate) {
      message.warn('一审截止日期必填');
      return;
    }
    const params2 = {
      qualityId: Number(this.query.id),
      type: this.query.status === '2' || this.query.status === '4' ? 1 : 2,
      checkResult: Number(appealParam.checkResult)===1?4:1,
      isWarn: appealParam.isWarn===null?undefined:appealParam.isWarn,
      desc: appealParam.desc ? appealParam.desc : undefined,
      firstAppealEndDate: appealParam.appealEndDate ? appealParam.appealEndDate : undefined,
    };
    this.props.dispatch({
      type: 'editQualityNewSheet/checkQuality',
      payload: { ...params, ...params2 },
    });
  };

  render() {
    const { qualityDetail = {} } = this.props.qualityNewSheet;
    const { orderDetail, qualityAudit = [], ...others } = qualityDetail;
    const newqualityAudit = [];
    console.log(qualityAudit);
    qualityAudit && qualityAudit.forEach((v) => {
      newqualityAudit.push({
        checkResult: v.operate === 4 ? 0 : 1,
        operator: null,
        operateDate: v.updateTime,
        checkResultDesc: v.desc
      })
    });
    return (
      <div className={styles.qualityContainter}>
        {/* form区域 */}
        <CommonForm {...this.props} onSubmit={this.onSubmit} dataSource={{ ...others }} formType="quality" actionType="appeal">
          <QualityAppeal data={newqualityAudit} setStateData={this.setStateData} />
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
