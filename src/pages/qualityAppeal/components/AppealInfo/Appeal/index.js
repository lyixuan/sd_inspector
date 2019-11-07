import React from 'react';
import { connect } from 'dva';
import BIButton from '@/ant_components/BIButton';
import BIModal from '@/ant_components/BIModal';
import styles from './style.less';
import AppealInfo from '../appealBlock/appealDeailInfo';
import router from 'umi/router';
import { message, Spin } from 'antd';
const confirm = BIModal.confirm;
class QualityAppealing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      qualityInfoCollapse: true,
      appealIsShow: true,
      appealParam: {},
      checkResult: undefined,
      appealEndDate: undefined,
      visible: false,
    };
    const { query = {} } = this.props.location;
    this.query = query;
    this.firstAppealEndDate = null;
  }
  handleCollapse() {
    this.setState({ qualityInfoCollapse: !this.state.qualityInfoCollapse });
  }
  handleAppeal() {
    this.setState({ appealIsShow: !this.state.appealIsShow });
  }
  handleSubmitSop = () => {
    const { appealParam } = this.state;
    if (Number(appealParam.checkResult) !== 0 && !appealParam.checkResult) {
      message.warn('审核结果为必选项');
      return;
    }
    if (
      String(this.query.status) === '4' &&
      Number(appealParam.checkResult) === 1 &&
      !appealParam.appealEndDate
    ) {
      message.warn('二申截止日期必填');
      return;
    }
    const params = {
      qualityId: Number(this.query.id),
      type: String(this.query.status) === '2' || String(this.query.status) === '4' ? 1 : 2,
      checkResult: Number(appealParam.checkResult) === 1 ? 1 : 0,
      isWarn: appealParam.isWarn,
      desc: appealParam.desc ? appealParam.desc : undefined,
      appealEndDate:
        String(this.query.status) === '2'
          ? this.query.firstAppealEndDate
          : String(this.query.status) === '6'
          ? this.query.secondAppealEndDate
          : undefined,
    };
    const that = this;
    confirm({
      className: 'BIConfirm',
      title: '是否确认提交？',
      cancelText: '取消',
      okText: '确认',
      onOk() {
        that.props.dispatch({
          type: 'qualityAppealing/sopAppeal',
          payload: { params },
        });
      },
      onCancel() {},
    });
  };
  handleSubmitMaster = formParams => {
    const { appealShow = [], QualityDetailData = {} } = this.props;
    const { appealParam } = this.state;
    if (appealParam.checkResult !== 0 && !appealParam.checkResult) {
      message.warn('审核结果为必选项');
      return;
    }
    if (
      String(this.query.status) === '4' &&
      Number(appealParam.checkResult) === 0 &&
      !appealParam.appealEndDate
    ) {
      message.warn('二申截止日期必填');
      return;
    }
    const appealParamNew = {
      qualityId: Number(this.query.id),
      type: String(this.query.status) === '2' || String(this.query.status) === '4' ? 1 : 2,
      checkResult: Number(appealParam.checkResult) === 1 ? 1 : 0,
      isWarn: appealParam.isWarn,
      desc: appealParam.desc ? appealParam.desc : undefined,
      appealEndDate: appealParam.appealEndDate ? appealParam.appealEndDate : undefined,
    };
    const that = this;
    confirm({
      className: 'BIConfirm',
      title: '是否确认提交？',
      cancelText: '取消',
      okText: '确认',
      onOk() {
        that.props.dispatch({
          type: 'qualityAppealing/reviewAppeal',
          payload: {
            qualityInspectionParam: QualityDetailData,
            appealParam: appealParamNew,
          },
        });
      },
      onCancel() {},
    });
  };
  handleCancel = () => {
    const that = this;
    confirm({
      className: 'BIConfirm',
      title: '此操作将不保存已录入内容，是否确认？',
      cancelText: '取消',
      okText: '确认',
      onOk() {
        router.goBack();
      },
      onCancel() {},
    });
  };
  setStateData = val => {
    this.setState({
      appealParam: val,
      checkResult: val.checkResult === null ? null : Number(val.checkResult),
      appealEndDate: val.appealEndDate,
    });
  };
  getAppealStatus() {
    if (this.state.appealIsShow) {
      return '-';
    }
    return '+';
  }
  render() {
    const { visible, checkResult, appealEndDate } = this.state;
    const { appealShow = [], QualityDetailData = {} } = this.props;
    const { submitLoading2 } = this.props;
    if (appealShow) {
      appealShow.forEach(v => {
        if (v.type === 1) {
          this.firstAppealEndDate = v.appealEndDate;
        }
      });
    }

    return (
      <Spin spinning={this.props.pageLoading}>
        <div className={styles.detailContainer}>
          {String(this.query.status) === '2' || String(this.query.status) === '6' ? (
            <section style={{ overflow: 'hidden' }}>
              <AppealInfo
                {...this.props}
                dataList={appealShow}
                formType="appeal"
                appealStatus={this.query.status}
                setStateData={this.setStateData}
              />
              <div style={{ float: 'right' }}>
                <BIButton onClick={this.handleCancel} style={{ marginRight: 20 }}>
                  取消
                </BIButton>
                <BIButton loading={submitLoading2} type="primary" onClick={this.handleSubmitSop}>
                  提交审核
                </BIButton>
              </div>
            </section>
          ) : (
            <div>
              <AppealInfo
                {...this.props}
                dataList={appealShow}
                formType="appeal"
                appealStatus={this.query.status}
                setStateData={this.setStateData}
              />
              <div style={{ float: 'right' }}>
                <BIButton onClick={this.handleCancel} style={{ marginRight: 20 }}>
                  取消
                </BIButton>
                <BIButton loading={submitLoading2} type="primary" onClick={this.handleSubmitMaster}>
                  提交审核
                </BIButton>
              </div>
            </div>
          )}
        </div>
      </Spin>
    );
  }
}

export default QualityAppealing;
