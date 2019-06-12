import React from 'react';
import styles from './style.less';
import { connect } from 'dva';
import { Spin,message } from 'antd';
import FirstCheckResult from '../../components/FirstCheckResult/index';
import SecondCheckResult from '../../components/SecondCheckResult/index';
import CreateAppeaRecord from '../../components/CreateAppeaRecord/index';
import FirstCheck from '../../components/FirstCheck/index';
import SecondCheck from '../../components/SecondCheck/index';
import Tags from '../../components/Tags/index';
import router from 'umi/router';
import BIButton from '@/ant_components/BIButton/index';
import imgUp from '@/assets/scoreQuality/up.png';
import imgdown from '@/assets/scoreQuality/down.png';
import BaseInfo from '../../components/BaseInfo/index';
import BIModal from '@/ant_components/BIModal/index';

@connect(({ scoreAppealModel, loading,onAppealModel }) => ({
  scoreAppealModel,onAppealModel,
  loading: loading.effects['scoreAppealModel/queryBaseAppealInfo']||loading.effects['scoreAppealModel/queryAppealInfoCheckList'],
  submitLoading: loading.effects['onAppealModel/sopCheck']||loading.effects['onAppealModel/masterCheck'],
}))
class AppealCheck extends React.Component {
  constructor(props) {
    super(props);
    const { query = {} } = this.props.location;
    this.state = {
      checkedTags:[],
      collapse1: Number(query.firstOrSec)===1,
      collapse2: true,
      visible:false,
      checkResult:undefined,
      desc:undefined,
    };
    this.checkType = null;
  }

  componentDidMount() {
    const { query = {} } = this.props.location;
    this.props.dispatch({
      type: 'scoreAppealModel/queryBaseAppealInfo',
      payload: { params: { dimensionId: query.dimensionId, dimensionType: query.dimensionType } },
    });
    this.props.dispatch({
      type: 'scoreAppealModel/queryAppealInfoCheckList',
      payload: { params: { creditAppealId: query.id } },
    });
    if (Number(query.sopOrMaster)===2) {
      this.props.dispatch({
        type: 'onAppealModel/getMasterTagList',
        payload: { params: { } },
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
  submitCheck = (checkType) => {
    const { query = {} } = this.props.location;
    const { checkResult,secondAppealEndDate,creditDate,appealNum,actualRecommendLevel,score } = this.state;
    this.checkType = checkType;
    if (this.checkType === 'sop') {
      if (checkResult!==0&&!checkResult) {
        message.warn('请选择审核结果');
        return;
      }
    }
    if (this.checkType === 'master') {
      const { checkResult } = this.state;
      if (checkResult!==0&&!checkResult) {
        message.warn('请选择审核结果');
        return;
      }
      if (Number(query.firstOrSec===1)&&checkResult===0&&!secondAppealEndDate) {
        message.warn('请选择二申截止日期');
        return;
      }
      if (Number(query.creditType===47)&&checkResult===1&&!creditDate) {
        message.warn('请选择学分日期');
        return;
      }
      if ((Number(query.creditType===12)||Number(query.creditType===17))&&appealNum!==0&&!appealNum) {
        message.warn('请输入申诉个数');
        return;
      }
      if (Number(query.dimensionType)===42&&checkResult===1&&!actualRecommendLevel) {
        message.warn('请选择实际推荐等级');
        return;
      }
      if (Number(query.dimensionType)===42&&checkResult===1&&score!==0&&!score) {
        message.warn('请填写学分');
        return;
      }
    }

    this.setState({
      visible: true,
    });
  };
  handleOk = () => {
    const { query = {} } = this.props.location;
    const { id } = query;
    const { desc, checkResult,secondAppealEndDate,creditDate,appealNum,actualRecommendLevel,score,checkedTags } = this.state;
    if (this.checkType === 'sop') {
      const params = {
        type:Number(query.firstOrSec),          // 1申 2申
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
    }
    if (this.checkType === 'master') {
      const params = {
        type:Number(query.firstOrSec),          // 1申 2申
        creditAppealId: Number(id),
        creditType:Number(query.creditType),
        desc,
        checkResult,
        secondAppealEndDate,
        creditDate,
        appealNum,
        actualRecommendLevel,
        score,
        tagList:checkedTags
      };
      const that = this;
      this.props.dispatch({
        type: 'onAppealModel/masterCheck',
        payload: { params },
      }).then(() => {
        that.setState({
          visible: false,
        });
        router.goBack();
      });
    }
  };
  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };
  onTagChangeFun=(item)=>{
    const {checkedTags} = this.state;
    const hasIn = checkedTags.some((v,i)=>{
      if (v === item.id){
        checkedTags.splice(i,1);
        this.setState({
          checkedTags
        })
      }
      return v === item.id
    });
    if (!hasIn) {
      const tmp = checkedTags.concat(item.id);
      this.setState({
        checkedTags:tmp
      })
    }
  };
  render() {
    const { query = {} } = this.props.location;
    const {collapse1,collapse2,checkedTags=[]} = this.state;
    const {loading,scoreAppealModel={},onAppealModel={}}=this.props;
    const {tagList=[]}=onAppealModel;
    const {detailInfo={},appealRecord={}}=scoreAppealModel;
    const firstRecord = appealRecord[1];
    const SecondRecord = appealRecord[2];
    const { appealStart:appealStart1, sopAppealCheck:sopAppealCheck1, masterAppealCheck:masterAppealCheck1 } = firstRecord||{};
    const { appealStart:appealStart2, sopAppealCheck:sopAppealCheck2 , masterAppealCheck:masterAppealCheck2 } = SecondRecord||{};
    return (
      <Spin spinning={loading}>
      <div className={styles.appealContainer}>
        <BaseInfo detailInfo={detailInfo} dimensionType={query.dimensionType}/>
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
            <span >二次申诉 {query.secondAppealEndDate? `(二次申诉截止日期：${query.secondAppealEndDate})`:''}</span>
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
        {Number(query.sopOrMaster)===1&&(
          <div>
            <div className={styles.foldBox}>
              <span>对接人审核</span>
              <span/>
            </div>
            <FirstCheck onFormChange={(value, vname) => this.onFormChange(value, vname)}/>
          </div>
        )}
        {Number(query.sopOrMaster)===2&&(
          <div>
            <div className={styles.foldBox}>
              <span>主管审核</span>
              <span/>
            </div>
            <SecondCheck onFormChange={(value, vname) => this.onFormChange(value, vname)}
                         firstOrSec ={Number(query.firstOrSec)===1}
                         creditType={query.creditType}
                         dimensionType={query.dimensionType}/>
            <Tags tags={tagList}
                  checkedTags={checkedTags}
                  onTagChange={item => this.onTagChangeFun(item)}/>
          </div>
        )}
        <footer style={{ textAlign: 'right', marginTop: '20px' }}>
          <BIButton onClick={() => router.goBack()} style={{marginRight:'15px'}}>返回</BIButton>
          {Number(query.sopOrMaster)===1&&(
            <BIButton type='primary' onClick={() => this.submitCheck('sop')}>提交审核</BIButton>
          )}
          {Number(query.sopOrMaster)===2&&(
            <BIButton type='primary' onClick={() => this.submitCheck('master')}>提交审核</BIButton>
          )}
        </footer>
        {/*-----------*/}
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
          ]}>
          <div className={styles.modalWrap}>是否确认提交？</div>
        </BIModal>
      </div>
      </Spin>
    );
  }
}

export default AppealCheck;
