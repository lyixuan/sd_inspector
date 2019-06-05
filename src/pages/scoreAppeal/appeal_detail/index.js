import React from 'react';
import styles from './style.less';
import { connect } from 'dva';
import { Spin } from 'antd';
import ScorePersonInfo from '../components/scorePersonInfo';
import ScoreBasicInfo from '../components/scoreBasicInfo';
import SubOrderDetail from '../components/subOrderDetail';
import FirstCheckResult from '../components/FirstCheckResult';
import SecondCheckResult from '../components/SecondCheckResult';
import CreateAppeaRecord from '../components/CreateAppeaRecord';
import router from 'umi/router';
import BIButton from '@/ant_components/BIButton';
import imgUp from '@/assets/scoreQuality/up.png';
import imgdown from '@/assets/scoreQuality/down.png';

@connect(({ scoreAppealModel,loading }) => ({
  scoreAppealModel,
  loading: loading.effects['scoreAppealModel/queryBaseAppealInfo'],
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
    console.log(this.props)
    this.props.dispatch({
      type: 'scoreAppealModel/queryBaseAppealInfo',
      payload: { params: {} },
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
    const {loading}=this.props;
    return (
      <Spin spinning={loading}>
      <div className={styles.appealContainer}>
        {/* 学分归属人信息 */}
        <ScorePersonInfo/>
        <div className={styles.spaceLine}/>
        {/* 子订单详情 */}
        <SubOrderDetail/>
        <div className={styles.spaceLine}/>
        {/* 申诉基础信息 */}
        <ScoreBasicInfo/>
        <div className={styles.spaceLine}/>
        <div>
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
        </div>
        <div>
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
            </div>
          )}
        </div>
        <footer style={{ textAlign: 'right', marginTop: '20px' }}>
          <BIButton onClick={() => router.goBack()}>返回</BIButton>
        </footer>
      </div>
      </Spin>
    );
  }
}

export default AppealCheck;
