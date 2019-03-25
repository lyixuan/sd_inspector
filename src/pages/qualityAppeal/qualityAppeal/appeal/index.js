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
    this.state={};
    console.log(this.props);
    const {query = {}} = this.props.location;
    this.query  = query;
  }
  componentDidMount(){
    this.getQualityInfo();
    this.getAppealInfo();
  }
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
  }
  handleSubmit = () => {
    console.log(1)
    // this.props.dispatch({
    //   type: 'createPointBook/reviewAppel',
    //   payload: { qualityInspectionParam, appealParam },
    // })
  }
  render() {
    const {appealShow,qualityDetailData} = this.props.qualityAppealing;
    // console.log(appealShow)

    return (
      <div className={styles.qualityContainter}>
        <div className={styles.title}>质检违规详情 <span className={styles.passTimeCls}>（质检通过时间：2019-02-01 22:22:22）</span>  </div>
        <CommonForm {...this.props} qualityDetailData={qualityDetailData} onSubmit={this.onSubmit} >
          <div>
            <div className={styles.title}>申诉信息</div>
            <AppealInfo dataList={appealShow}/>
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
