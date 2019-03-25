import React from 'react';
import { connect } from 'dva';
import BIButton from '@/ant_components/BIButton';
import BIModal from '@/ant_components/BIModal';
import CommonForm from '@/pages/qualityAppeal/components/commonForm';
import styles from './style.less';
import PersonInfo from '@/pages/qualityAppeal/qualityNewSheet/detail/components/personInfo';
import SubOrderDetail from './../../components/subOrderDetail';
import AppealInfo from './component/AppealInfo';
import router from 'umi/router';


@connect(({ qualityAppealing, qualityAppealHome }) => ({
  qualityAppealing,
  orgList: qualityAppealHome.orgList,
}))
class  QualityAppealing extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      appealInfoCollapse: true
    };
    const {query = {}} = this.props.location;
    this.query  = query;
    this.firstAppealEndDate = null;
  }
  handleCollapse() {
    this.setState({ appealInfoCollapse: !this.state.appealInfoCollapse });
  }
  componentDidMount(){
    this.getQualityInfo();
    this.getAppealInfo();
  };
  getAppealInfo=()=>{
    this.props.dispatch({
      type: 'qualityAppealing/getAppealInfo',
      payload: { id:this.query.id},
    })
  };
  getQualityInfo=()=>{
    this.props.dispatch({
      type: 'qualityAppealing/getQualityDetailData',
      payload: { id:this.query.id},
    })
  };
  handleSubmit = () => {
    console.log(1)
    // this.props.dispatch({
    //   type: 'createPointBook/reviewAppel',
    //   payload: { qualityInspectionParam, appealParam },
    // })
  };
  handleCancel = () => {
    router.goBack();
  };
  render() {
    const {appealShow=[],qualityDetailData} = this.props.qualityAppealing;
      appealShow.forEach((v)=>{
        if (v.type === 1)  {
          this.firstAppealEndDate = v.appealEndDate;
        }
      });
    return (
      <div className={styles.detailContainer}>
        {this.query.status !== 2 || this.query.status === 6 ? (
          <section style={{overflow:'hidden'}}>
            {/* 质检违规人员信息 */}
            <PersonInfo
              data={qualityDetailData}
              appealInfoCollapse={this.state.qualityInfoCollapse}
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
              <div className={styles.title}>申诉信息</div>
              <AppealInfo dataList={appealShow} status={this.query.status}/>
            </div>
            <div style={{float:'right'}}>
              <BIButton onClick={this.handleCancel} style={{marginRight:20}}>
                取消
              </BIButton>
              <BIButton type="primary" onClick={this.handleSubmit}>
                提交审核
              </BIButton>
            </div>
          </section>
        ):(
          <CommonForm
            {...this.props}
            // dataSource={qualityDetailData}
            onSubmit={this.onSubmit} >
            <div>
              <div className={styles.title}>申诉信息</div>
              <AppealInfo dataList={appealShow} status={this.query.status}/>
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
