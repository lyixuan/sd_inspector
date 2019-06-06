import React from 'react';
import styles from './style.less';
import { connect } from 'dva';
import { Spin,message } from 'antd';
import FirstCheckResult from '../components/FirstCheckResult';
import SecondCheckResult from '../components/SecondCheckResult';
import CreateAppeaRecord from '../components/CreateAppeaRecord';
import FirstCheck from '../components/FirstCheck';
import SecondCheck from '../components/SecondCheck';
import Tags from '../components/Tags';
import router from 'umi/router';
import BIButton from '@/ant_components/BIButton';
import imgUp from '@/assets/scoreQuality/up.png';
import imgdown from '@/assets/scoreQuality/down.png';
import BaseInfo from '../components/BaseInfo';
import BIModal from '@/ant_components/BIModal';

@connect(({ scoreAppealModel, loading,onAppealModel }) => ({
  scoreAppealModel,onAppealModel,
  loading: loading.effects['scoreAppealModel/queryBaseAppealInfo']||loading.effects['scoreAppealModel/queryAppealInfoCheckList'],
  submitLoading: loading.effects['onAppealModel/sopCheck'],
}))
class AppealCheck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse1: true,
      collapse2: true,
      visible:false,
      checkResult:undefined,
      desc:undefined,
    };
  }

  componentDidMount() {
    const { query = {} } = this.props.location;
    this.props.dispatch({
      type: 'scoreAppealModel/queryBaseAppealInfo',
      payload: { params: { dimensionId: query.dimensionId, dimensionType: query.dimensionType } },
    });
    if (!query.isAwait) {
      this.props.dispatch({
        type: 'scoreAppealModel/queryAppealInfoCheckList',
        payload: { params: { creditAppealId: query.id } },
      });
    }
  }

  handleCollapse=(type)=> {
    if (type === 1){
      this.setState({
        collapse1: !this.state.collapse1
      });
    } else {
      this.setState({
        collapse2: !this.state.collapse2
      });
    }
  }
  onFormChange = (value, vname) => {
    this.setState({
      [vname]: value,
    });
  };
  submitCheck = () => {
    const { checkResult } = this.state;
    if (!checkResult) {
      message.warn('请选择审核结果');
      return;
    }
    this.setState({
      visible: true,
    });
  };
  handleOk = () => {
    const { query = {} } = this.props.location;
    const { id, creditType,dimensionType } = query;
    const { desc, checkResult } = this.state;
    const params = {
      type:1,
      creditAppealId: Number(id),
      desc,
      checkResult
    };
    const that = this;
    this.props.dispatch({
      type: 'onAppealModel/sopCheck',
      payload: { params },
    }).then(() => {
      that.setState({
        visible: false,
      });
      router.goBack();
    });

  };
  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };
  onTagChangeFun=()=>{

  }
  render() {
    const {collapse1,collapse2,tags=[],checkedTags} = this.state;
    const {loading,scoreAppealModel={}}=this.props;
    const {detailInfo={},appealRecord={}}=scoreAppealModel;
    const firstRecord = appealRecord[1];
    const SecondRecord = appealRecord[2];
    const { appealStart:appealStart1, sopAppealCheck:sopAppealCheck1, masterAppealCheck:masterAppealCheck1 } = firstRecord||{};
    const { appealStart:appealStart2, sopAppealCheck:sopAppealCheck2 , masterAppealCheck:masterAppealCheck2 } = SecondRecord||{};
    return (
      <Spin spinning={loading}>
      <div className={styles.appealContainer}>
        <BaseInfo detailInfo={detailInfo}/>
        {firstRecord&&<div>
          <div className={styles.foldBox}>
            <span >一次申诉</span>
            <span onClick={()=>this.handleCollapse(1)}><img src={collapse1?imgdown:imgUp} width='18' height='18'/></span>
          </div>
          {/* 申诉内容 */}
          {collapse1&&(
            <div style={{paddingLeft:'15px'}}>
              {appealStart1&&<CreateAppeaRecord appealStart={appealStart1}/>}
              {sopAppealCheck1&&sopAppealCheck1.length!==0&&<FirstCheckResult sopAppealCheck={sopAppealCheck1}/>}
              {masterAppealCheck1&&<SecondCheckResult masterAppealCheck={masterAppealCheck1}/>}
              <div className={styles.spaceLine}/>
            </div>
          )}
        </div>}
        {SecondRecord&&<div>
          <div className={styles.foldBox}>
            <span >二次申诉</span>
            <span onClick={()=>this.handleCollapse(2)}><img src={collapse2?imgdown:imgUp} width='18' height='18'/></span>
          </div>
          {/* 申诉内容 */}
          {collapse2&&(
            <div style={{paddingLeft:'15px'}}>
              {appealStart2&&<CreateAppeaRecord appealStart={appealStart2}/>}
              {sopAppealCheck2&&sopAppealCheck2.length!==0&&<FirstCheckResult sopAppealCheck={sopAppealCheck2}/>}
              {masterAppealCheck2&&<SecondCheckResult masterAppealCheck={masterAppealCheck2}/>}
              <div className={styles.spaceLine}/>
            </div>
          )}
        </div>
        }
        <div className={styles.foldBox}>
          <span>对接人审核</span>
          <span></span>
        </div>
        <FirstCheck onFormChange={(value, vname) => this.onFormChange(value, vname)}/>
        <div className={styles.foldBox}>
          <span>主管审核</span>
          <span></span>
        </div>
        <SecondCheck onFormChange={(value, vname) => this.onFormChange(value, vname)}/>
        <Tags tags={tags}
              checkedTags={checkedTags}
              onTagChange={item => this.onTagChangeFun(item)}/>
        <footer style={{ textAlign: 'right', marginTop: '20px' }}>
          <BIButton onClick={() => router.goBack()} style={{marginRight:'15px'}}>返回</BIButton>
          <BIButton type='primary' onClick={() => this.submitCheck()}>提交审核</BIButton>
        </footer>
        <BIModal
          title="提交确认"
          visible={this.state.visible}
          footer={[
            <BIButton style={{ marginRight: 10 }} onClick={this.handleCancel}>
              取消
            </BIButton>,
            <BIButton type="primary" loading={this.props.submitLoading} onClick={this.handleOk}>
              确定
            </BIButton>,
          ]}
        >
          <div className={styles.modalWrap}>是否确认提交？</div>
        </BIModal>
      </div>
      </Spin>
    );
  }
}

export default AppealCheck;
