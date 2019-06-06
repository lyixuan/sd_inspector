import React from 'react';
import styles from './style.less';
import { connect } from 'dva';
import { Spin } from 'antd';
import FirstCheckResult from '../components/FirstCheckResult';
import SecondCheckResult from '../components/SecondCheckResult';
import CreateAppeaRecord from '../components/CreateAppeaRecord';
import BaseInfo from '../components/BaseInfo';
import router from 'umi/router';
import BIButton from '@/ant_components/BIButton';
import imgUp from '@/assets/scoreQuality/up.png';
import imgdown from '@/assets/scoreQuality/down.png';

@connect(({ scoreAppealModel,loading }) => ({
  scoreAppealModel,
  loading: loading.effects['scoreAppealModel/queryBaseAppealInfo']||loading.effects['scoreAppealModel/queryAppealInfoCheckList'],
}))

class AppealCheck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse1: true,
      collapse2: true,
    };
  }
  componentDidMount() {
    const {query={}} = this.props.location;
    this.props.dispatch({
      type: 'scoreAppealModel/queryBaseAppealInfo',
      payload: { params:{dimensionId:query.dimensionId,dimensionType:query.dimensionType}  },
    });
    this.props.dispatch({
      type: 'scoreAppealModel/queryAppealInfoCheckList',
      payload: { params:{creditAppealId:query.id} },
    });
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

  render() {
    const {collapse1,collapse2} = this.state;
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
        {firstRecord&&(
          <div>
            <div className={styles.foldBox}>
              <span >一次申诉</span>
              <span onClick={()=>this.handleCollapse(1)}><img src={collapse1?imgdown:imgUp} width='18' height='18'/></span>
            </div>
            {collapse1&&(
              <div style={{paddingLeft:'15px'}}>
                {appealStart1&&<CreateAppeaRecord appealStart={appealStart1}/>}
                {sopAppealCheck1&&sopAppealCheck1.length!==0&&<FirstCheckResult sopAppealCheck={sopAppealCheck1}/>}
                {masterAppealCheck1&&<SecondCheckResult masterAppealCheck={masterAppealCheck1}/>}
                <div className={styles.spaceLine}/>
              </div>
            )}
          </div>
        )}
        {SecondRecord&&(
          <div>
            <div className={styles.foldBox}>
              <span >二次申诉</span>
              <span onClick={()=>this.handleCollapse(2)}><img src={collapse2?imgdown:imgUp} width='18' height='18'/></span>
            </div>
            {collapse2&&(
              <div style={{paddingLeft:'15px'}}>
                {appealStart2&&<CreateAppeaRecord appealStart={appealStart2}/>}
                {sopAppealCheck2&&sopAppealCheck2.length!==0&&<FirstCheckResult sopAppealCheck={sopAppealCheck2}/>}
                {masterAppealCheck2&&<SecondCheckResult masterAppealCheck={masterAppealCheck2}/>}
              </div>
            )}
          </div>
        )}
        <footer style={{ textAlign: 'right', marginTop: '20px' }}>
          <BIButton onClick={() => router.goBack()}>返回</BIButton>
        </footer>
      </div>
      </Spin>
    );
  }
}

export default AppealCheck;
