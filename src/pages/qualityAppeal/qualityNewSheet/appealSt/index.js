import React from 'react';
import { connect } from 'dva';
import BIButton from '@/ant_components/BIButton';
import BIModal from '@/ant_components/BIModal';
import styles from './style.less';
import CommonForm from '../../components/commonForm';
import QualityAppeal from '../../components/AppealInfo/qualityAppeal';
import { message, Spin } from 'antd';
import { BiFilter } from '@/utils/utils';
@connect(({ loading, qualityNewSheet, editQualityNewSheet,qualityAppealHome }) => ({
  loading,
  qualityNewSheet,
  qualityAppealHome,
  editQualityNewSheet,
  submitLoading: loading.effects['editQualityNewSheet/checkQuality'],
  pageLoading: loading.effects['qualityNewSheet/getQualityDetail']
}))
class EditQualityNewSheet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkResult: undefined,
      appealEndDate: undefined
    };
    const { query = {} } = this.props.location;
    this.query = query;
    this.appealParam = {};
  }
  componentDidMount() {
    this.getQualityDetailData();
  }
  getQualityDetailData = () => {
    const { location: { query }, } = this.props;
    this.props.dispatch({
      type: 'qualityNewSheet/getQualityDetail',
      payload: query,
    });
  };
  setStateData = val => {
    this.appealParam = val;
    this.setState({
      checkResult: val.checkResult===null?null: Number(val.checkResult),
      appealEndDate: val.appealEndDate
    })
  };
  onSubmit = params => {
    const { appealParam } = this;
    const {dimensionList1=[],dimensionList2=[]} = this.props.qualityAppealHome
    const { qualityDetail = {} } = this.props.qualityNewSheet;
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
    let dimensionName = ''
    dimensionList1.concat(dimensionList2).forEach((v)=>{
      if (v.id === params.dimensionId) {
        dimensionName= v.name
      }
    });
    const otherObj = {
      violationLevelName:BiFilter(`VIOLATION_LEVEL|id:${params.violationLevel}`).name,
      violationName:dimensionName,
    }
    this.props.dispatch({
      type: 'editQualityNewSheet/checkQuality',
      payload: { ...params, ...params2,...otherObj },
    });
  };

  render() {
    const { checkResult, appealEndDate } = this.state;
    const { qualityDetail = {} } = this.props.qualityNewSheet;
    const { qualityAudit = [], ...others } = qualityDetail;
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
          <CommonForm {...this.props} checkResult={checkResult} appealEndDate={appealEndDate} onSubmit={this.onSubmit} dataSource={{ ...others }} formType="quality" actionType="appeal">
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
