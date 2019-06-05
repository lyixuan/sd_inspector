import React from 'react';
import styles from './style.less';
import { connect } from 'dva';
import CreateAppeal from '../components/CreateAppeal';
import FirstCheckResult from '../components/FirstCheckResult';
import SecondCheckResult from '../components/SecondCheckResult';
import CreateAppeaRecord from '../components/CreateAppeaRecord';
import router from 'umi/router';
import BIButton from '@/ant_components/BIButton';
import imgUp from '@/assets/scoreQuality/up.png';
import imgdown from '@/assets/scoreQuality/down.png';
import { Spin,message } from 'antd';
import BIModal from '@/ant_components/BIModal';
import BaseInfo from '../components/BaseInfo';

@connect(({ appealCreateModel,scoreAppealModel,loading }) => ({
  appealCreateModel,scoreAppealModel,
  loading: loading.effects['scoreAppealModel/queryBaseAppealInfo'],
  submitLoading: loading.effects['appealCreateModel/postStartAppeal'],
}))

class AppealCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse1: true,
      collapse2: true,
      visible:false
    };
  }
  componentDidMount() {
    const {query={}} = this.props.location;
    this.props.dispatch({
      type: 'scoreAppealModel/queryBaseAppealInfo',
      payload: { params:{dimensionId:query.dimensionId,dimensionType:query.dimensionType}  },
    });
    if (Number(query.type)!==1){
      this.props.dispatch({
        type: 'scoreAppealModel/queryAppealInfoCheckList',
        payload: { params:{creditAppealId:query.dimensionId} },
      });
    }
  }
  getFileList = (file) => {
    let formData = new FormData();
    formData.append("file", file);
    this.props.dispatch({
      type: 'uploadFile/queryuploadMultipleFile',
      payload: { file },
    })
  };
  onFormChange=(value,vname)=>{
    this.setState({
      [vname]:value
    });
  };
  submitAppeal=()=>{
    const {type=1,desc,dimensionType,attUrlList}=this.state;
    if (!desc){
      message.warn('申诉说明必填');
      return
    }
    this.setState({
      visible:true
    })
  };
  handleOk=()=>{
    const {query={}} = this.props.location;
    const {creditAppealId} = query;
    const {type=1,desc,dimensionType,attUrlList}=this.state;
    this.props.dispatch({
      type: 'appealCreateModel/postStartAppeal',
      payload: { params:{type,creditAppealId,desc,dimensionType:Number(dimensionType),attUrlList} },
    },()=>this.setState({
      visible:false
    }))

  };
  handleCancel=()=>{
    this.setState({
      visible:false
    })
  };
  handleCollapse = (type) => {
    if (type === 1) {
      this.setState({
        collapse1: !this.state.collapse1
      });
    } else {
      this.setState({
        collapse2: !this.state.collapse2
      });
    }
  }

  render() {
    const { collapse1, collapse2 } = this.state;
    const {loading,scoreAppealModel={}}=this.props;
    const {detailInfo={},appealRecord={}}=scoreAppealModel;
    const {appealStart=null,sopAppealCheck=null,masterAppealCheck=null}=appealRecord;
    const {query={}} = this.props.location;
    return (
      <Spin spinning={loading}>
      <div className={styles.appealContainer}>
        <BaseInfo detailInfo={detailInfo}/>
        {Number(query.type)===1&&(
          <div>
            <div className={styles.foldBox}>
              <span >一次申诉</span>
              <span onClick={() => this.handleCollapse(1)}><img src={collapse1 ? imgdown : imgUp} width='18' height='18' /></span>
            </div>
            <div className={styles.spaceLine} />
            {/* 申诉内容 */}
            {collapse1 && (
              <div style={{ paddingLeft: '15px' }}>
                <CreateAppeal {...this.props} getFileList={this.getFileList} appealStart={appealStart} onFormChange={(value,vname)=>this.onFormChange(value,vname)}/>
                {sopAppealCheck&&<FirstCheckResult sopAppealCheck={sopAppealCheck}/>}
                {masterAppealCheck&&<SecondCheckResult masterAppealCheck={masterAppealCheck}/>}
                <div className={styles.spaceLine} />
              </div>
            )}
          </div>
        )}
        {false&&(
          <div>
            <div className={styles.foldBox}>
              <span >二次申诉</span>
              <span onClick={() => this.handleCollapse(2)}><img src={collapse2 ? imgdown : imgUp} width='18' height='18' /></span>
            </div>
            {/* 申诉内容 */}
            {collapse2 && (
              <div style={{ paddingLeft: '15px' }}>
                <CreateAppeal getFileList={this.getFileList} />
                {sopAppealCheck&&<FirstCheckResult sopAppealCheck={sopAppealCheck}/>}
                {masterAppealCheck&&<SecondCheckResult masterAppealCheck={masterAppealCheck}/>}
              </div>
            )}
          </div>
        )}
        <footer style={{ textAlign: 'right', marginTop: '20px' }}>
          <BIButton onClick={() => router.goBack()} style={{ marginRight: '15px' }}>返回</BIButton>
          <BIButton type='primary' onClick={() => this.submitAppeal()}>提交申诉</BIButton>
        </footer>
        <BIModal
          title="提交确认"
          visible={this.state.visible}
          footer={[
            <BIButton style={{ marginRight: 10 }} onClick={this.handleCancel}>
              取消
            </BIButton>,
            <BIButton type="primary" loading={this.props.submitLoading}  onClick={this.handleOk}>
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

export default AppealCreate;
