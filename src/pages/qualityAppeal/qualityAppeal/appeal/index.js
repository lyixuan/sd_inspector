import React from 'react';
import { connect } from 'dva';
import BIButton from '@/ant_components/BIButton';
import BIModal from '@/ant_components/BIModal';
import CommonForm from '@/pages/qualityAppeal/components/commonForm';
import styles from './style.less';
import PersonInfo from '@/pages/qualityAppeal/qualityNewSheet/detail/components/personInfo';
import SubOrderDetail from './../../components/subOrderDetail';
import AppealInfo from '../../components/AppealInfo';
import router from 'umi/router';
import { message, Spin } from 'antd';
import {BiFilter} from '@/utils/utils';
const confirm = BIModal.confirm;

@connect(({ qualityAppealing, qualityAppealHome, loading }) => ({
  qualityAppealing,
  orgList: qualityAppealHome.orgList,
  submitLoading: loading.effects['qualityAppealing/reviewAppeal'],
  submitLoading2: loading.effects['qualityAppealing/sopAppeal'],
  pageLoading: loading.effects['qualityAppealing/getAppealInfo'] || loading.effects['qualityAppealing/getQualityDetailData']
}))
class QualityAppealing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      qualityInfoCollapse: true,
      appealIsShow: true,
      appealParam: {},
      checkResult: undefined,
      appealEndDate: undefined
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
  componentDidMount() {
    this.getQualityInfo();
    this.getAppealInfo();
  }
  getAppealInfo = () => {
    this.props.dispatch({
      type: 'qualityAppealing/getAppealInfo',
      payload: { id: this.query.id },
    });
  };
  getQualityInfo = () => {
    this.props.dispatch({
      type: 'qualityAppealing/getQualityDetailData',
      payload: { id: this.query.id },
    });
  };
  handleSubmitSop = () => {
    const { appealParam } = this.state;
    if (Number(appealParam.checkResult) !== 0 && !appealParam.checkResult) {
      message.warn('审核结果为必选项');
      return;
    }
    if (String(this.query.status) === '4' && Number(appealParam.checkResult) === 1 && !appealParam.appealEndDate) {
      message.warn('二申截止日期必填');
      return;
    }
    const params = {
      qualityId: Number(this.query.id),
      type: String(this.query.status) === '2' || String(this.query.status) === '4' ? 1 : 2,
      checkResult: Number(appealParam.checkResult) === 1 ? 1 : 0,
      isWarn: appealParam.isWarn,
      desc: appealParam.desc ? appealParam.desc : undefined,
      appealEndDate: String(this.query.status) === '2' ? this.query.firstAppealEndDate : String(this.query.status) === '6' ? this.query.secondAppealEndDate : undefined,
    };
    const that = this;
    confirm({
      className: 'BIConfirm',
      title: params.checkResult === 1 ? '提交后，该申诉将被提交给质检主管进行审核。' : '确认驳回这条记录吗？',
      cancelText: '取消',
      okText: '确定',
      onOk() {
        that.props.dispatch({
          type: 'qualityAppealing/sopAppeal',
          payload: { params },
        });
      },
      onCancel() { },
    });
  };
  handleSubmitMaster = formParams => {
    const { appealParam } = this.state;
    const { qualityDetailData = {} } = this.props.qualityAppealing;
    const otherObj = {
      violationLevelName:BiFilter(`VIOLATION_LEVEL|id:${qualityDetailData.violationLevel}`).name,
      violationName:qualityDetailData.dimension,
      firstAppealEndDate:this.query.firstAppealEndDate,
      // qualityValue:this.query.qualityValue,
      // qualityType:this.query.qualityType,
    }
    if (appealParam.checkResult !== 0 && !appealParam.checkResult) {
      message.warn('审核结果为必选项');
      return;
    }
    if (String(this.query.status) === '4' && Number(appealParam.checkResult) === 0 && !appealParam.appealEndDate) {
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
    this.props.dispatch({
      type: 'qualityAppealing/reviewAppeal',
      payload: { qualityInspectionParam: {...formParams,...otherObj}, appealParam: appealParamNew },
    });
  };
  handleCancel = () => {
    router.goBack();
  };
  setStateData = (val) => {
    this.setState({
      appealParam: val,
      checkResult: Number(val.checkResult),
      appealEndDate: val.appealEndDate
    });
  };
  getAppealStatus() {
    if (this.state.appealIsShow) {
      return '-';
    }
    return '+';
  }
  render() {
    const { checkResult, appealEndDate } = this.state;
    const { appealShow = [], qualityDetailData = {} } = this.props.qualityAppealing;
    const { submitLoading2 } = this.props;
    appealShow.forEach(v => {
      if (v.type === 1) {
        this.firstAppealEndDate = v.appealEndDate;
      }
    });
    return (
      <Spin spinning={this.props.pageLoading}>
        <div className={styles.detailContainer}>
          {String(this.query.status) === '2' || String(this.query.status) === '6' ? (
            <section style={{ overflow: 'hidden' }}>
              {/* 质检违规人员信息 */}
              <PersonInfo
                data={qualityDetailData}
                qualityInfoCollapse={this.state.qualityInfoCollapse}
                onClick={() => this.handleCollapse()}
              />
              <div
                className={
                  this.state.qualityInfoCollapse ? `${styles.showPanel} ` : `${styles.hidePanel}`
                }
              >
                {qualityDetailData.orderNum ? (
                  <div>
                    <div className={styles.divideLine} />
                    <div className={styles.subOrderNum}>子订单编号：{qualityDetailData.orderNum}</div>
                    <SubOrderDetail data={qualityDetailData.orderDetail} />
                  </div>
                ) : null}
              </div>
              <div style={{ marginTop: 20 }}>
                <div className={styles.title} >申诉信息 <span className={styles.iconCls} onClick={() => this.handleAppeal()}> {this.getAppealStatus()}</span>  </div>
                {this.state.appealIsShow ? <AppealInfo dataList={appealShow} formType="appeal" appealStatus={this.query.status} setStateData={this.setStateData} /> : null}
              </div>
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
              <CommonForm
                {...this.props}
                checkResult={checkResult}
                appealEndDate={appealEndDate}
                formType='appeal'
                actionType='appeal'
                appealStatus={Number(this.query.status)}
                dataSource={qualityDetailData}
                onSubmit={(params) => this.handleSubmitMaster(params)} >
                <div style={{ marginLeft: '-20px' }}>
                  <div className={styles.title} >申诉信息 <span className={styles.iconCls} onClick={() => this.handleAppeal()}> {this.getAppealStatus()}</span>  </div>
                  {this.state.appealIsShow ? <AppealInfo dataList={appealShow} formType="appeal" appealStatus={this.query.status} setStateData={this.setStateData} /> : null}
                </div>
              </CommonForm>
            )}
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

export default QualityAppealing;
