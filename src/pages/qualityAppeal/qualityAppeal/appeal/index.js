import React from 'react';
import { connect } from 'dva';
import { Row, Col } from 'antd';
import BIButton from '@/ant_components/BIButton';
import BIModal from '@/ant_components/BIModal';
import { BiFilter } from '@/utils/utils';
import CommonForm from '@/pages/qualityAppeal/components/commonForm';
import styles from './style.less';
import AppealInfo from './component/AppealInfo';


@connect(({ qualityAppealing, qualityAppealHome }) => ({
  qualityAppealing,
  orgList: qualityAppealHome.orgList,
}))
class  CreatePointBook extends React.Component {
  constructor(props) {
    super(props);
    this.state={
    };
    const {query = {}} = this.props.location;
    this.query  = query;
    this.firstAppealEndDate = null;
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
  render() {
    const {appealShow=[],qualityDetailData} = this.props.qualityAppealing;
      appealShow.forEach((v)=>{
        if (v.type === 1)  {
          this.firstAppealEndDate = v.appealEndDate;
        }
      });
    return (
      <div className={styles.qualityContainter}>
        <CommonForm
          {...this.props}
          // dataSource={qualityDetailData}
          onSubmit={this.onSubmit} >
          <div>
            <div className={styles.title}>申诉信息</div>
            <AppealInfo dataList={appealShow} status={this.query.status}/>
          </div>
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

export default CreatePointBook;
