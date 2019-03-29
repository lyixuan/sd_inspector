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
import { message } from 'antd/lib/index';
const confirm = BIModal.confirm;

@connect(({ qualityAppealing, qualityAppealHome }) => ({
  qualityAppealing,
  orgList: qualityAppealHome.orgList,
}))
class QualityAppealing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      qualityInfoCollapse: true,
      appealIsShow: true,
      appealParam:{}
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
    if (Number(appealParam.checkResult)!==0 && !appealParam.checkResult) {
      message.warn('审核结果为必选项');
      return;
    }
    if (this.query.status === '4' && Number(appealParam.checkResult)===1 && !appealParam.appealEndDate) {
      message.warn('二审截止日期必填');
      return;
    }
    const params = {
      qualityId: Number(this.query.id),
      type: this.query.status === '2' || this.query.status === '4' ? 1 : 2,
      checkResult: Number(appealParam.checkResult) === 1?1:0,
      isWarn: appealParam.isWarn,
      desc: appealParam.desc ? appealParam.desc : undefined,
      appealEndDate: appealParam.appealEndDate ? appealParam.appealEndDate : undefined,
    };
    const that = this;
    confirm({
      className: 'BIConfirm',
      title: '提交后，该申诉将被提交给质检主管进行审核。',
      cancelText: '取消',
      okText: '确定',
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
    const { appealParam } = this.state;
    if (appealParam.checkResult!== 0 && !appealParam.checkResult) {
      message.warn('审核结果为必选项');
      return;
    }
    if (this.query.status === '4' && !appealParam.appealEndDate) {
      message.warn('二审截止日期必填');
      return;
    }
    const appealParamNew = {
      qualityId: Number(this.query.id),
      type: this.query.status === '2' || this.query.status === '4' ? 1 : 2,
      checkResult: Number(appealParam.checkResult),
      isWarn: appealParam.isWarn,
      desc: appealParam.desc ? appealParam.desc : undefined,
      appealEndDate: appealParam.appealEndDate ? appealParam.appealEndDate : undefined,
    };
    this.props.dispatch({
      type: 'qualityAppealing/reviewAppeal',
      payload: { qualityInspectionParam: formParams, appealParam: appealParamNew },
    });
  };
  handleCancel = () => {
    router.goBack();
  };
  setStateData = (val)=>{
    this.setState({
      appealParam: val,
    });
  };
  getAppealStatus() {
    if (this.state.appealIsShow) {
      return '-';
    }
    return '+';
  }
  render() {
    const { appealShow = [], qualityDetailData = {} } = this.props.qualityAppealing;
    appealShow.forEach(v => {
      if (v.type === 1) {
        this.firstAppealEndDate = v.appealEndDate;
      }
    });
    return (
      <div className={styles.detailContainer}>
        {this.query.status === '2' || this.query.status === '6' ? (
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
              <div className={styles.subOrderNum}>子订单编号：{qualityDetailData.orderNum}</div>
              <SubOrderDetail data={qualityDetailData.orderDetail} />
            </div>
            <div style={{marginTop:20}}>
              <div className={styles.title} >申诉信息 <span className={styles.iconCls} onClick={()=>this.handleAppeal()}> {this.getAppealStatus()}</span>  </div>
              {this.state.appealIsShow?<AppealInfo dataList={appealShow} appealStatus={this.query.status} setStateData={this.setStateData}/>:null}
            </div>
            <div style={{ float: 'right' }}>
              <BIButton onClick={this.handleCancel} style={{ marginRight: 20 }}>
                取消
              </BIButton>
              <BIButton type="primary" onClick={this.handleSubmitSop}>
                提交审核
              </BIButton>
            </div>
          </section>
        ) : (
          <CommonForm
            {...this.props}
            formType='appeal'
            actionType='appeal'
            dataSource={qualityDetailData}
            onSubmit={(params)=>this.handleSubmitMaster(params)} >
            <div style={{marginLeft:'-20px'}}>
              <div className={styles.title} >申诉信息 <span className={styles.iconCls} onClick={()=>this.handleAppeal()}> {this.getAppealStatus()}</span>  </div>
              {this.state.appealIsShow?<AppealInfo dataList={appealShow} appealStatus={this.query.status} setStateData={this.setStateData}/>:null}
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
    );
  }
}

export default QualityAppealing;
