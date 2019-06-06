import React from 'react';
import styles from './style.less';
import { connect } from 'dva';
import { Spin } from 'antd';
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

@connect(({ scoreAppealModel, loading }) => ({
  scoreAppealModel,
  loading: loading.effects['scoreAppealModel/queryBaseAppealInfo']||loading.effects['scoreAppealModel/queryAppealInfoCheckList'],
  submitLoading: loading.effects['appealCreateModel/postStartAppeal'],
}))
class AppealCheck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse1: true,
      collapse2: true,
      appealInfoCollapse: []
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
              <CreateAppeaRecord/>
              <FirstCheckResult />
              <SecondCheckResult />
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
              <CreateAppeaRecord/>
              <FirstCheckResult />
              <SecondCheckResult />
              <div className={styles.spaceLine}/>
            </div>
          )}
        </div>
        }
        <div className={styles.foldBox}>
          <span>对接人审核</span>
          <span></span>
        </div>
        <FirstCheck/>
        <div className={styles.foldBox}>
          <span>主管审核</span>
          <span></span>
        </div>
        <SecondCheck/>
        <Tags tags={tags}
              checkedTags={checkedTags}
              onTagChange={item => this.onTagChangeFun(item)}/>
        <footer style={{ textAlign: 'right', marginTop: '20px' }}>
          <BIButton onClick={() => router.goBack()} style={{marginRight:'15px'}}>返回</BIButton>
          <BIButton type='primary' onClick={() => router.goBack()}>提交审核</BIButton>
        </footer>
      </div>
      </Spin>
    );
  }
}

export default AppealCheck;
