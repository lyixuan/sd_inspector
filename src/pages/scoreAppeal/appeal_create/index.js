import React from 'react';
import styles from './style.less';
import { connect } from 'dva';
import ScorePersonInfo from '../components/scorePersonInfo';
import ScoreBasicInfo from '../components/scoreBasicInfo';
import SubOrderDetail from '../components/subOrderDetail';
import CreateAppeal from '../components/createAppeal';
import FirstCheckResult from '../components/firstCheckResult';
import SecondCheckResult from '../components/secondCheckResult';
import AppealInfo from '../components/appealInfo';
import router from 'umi/router';
import BIButton from '@/ant_components/BIButton';
import imgUp from '@/assets/scoreQuality/up.png';
import imgdown from '@/assets/scoreQuality/down.png';

class FirstAppealCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse1: true,
      collapse2: true,
      appealInfoCollapse: [],
      newId: 1 };
  }

  componentDidMount() {
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
    return (
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
          <div className={styles.spaceLine}/>
          {/* 申诉内容 */}
          {collapse1&&(
            <div style={{paddingLeft:'15px'}}>
              <CreateAppeal/>
              <AppealInfo/>
              <FirstCheckResult />
              <SecondCheckResult />
            </div>
          )}
        </div>
        <div className={styles.spaceLine}/>
        <div>
          <div className={styles.foldBox}>
            <span >二次申诉</span>
            <span onClick={()=>this.handleCollapse(2)}><img src={collapse2?imgdown:imgUp} width='18' height='18'/></span>
          </div>
          <div className={styles.spaceLine}/>
          {/* 申诉内容 */}
          {collapse2&&(
            <div style={{paddingLeft:'15px'}}>
              <CreateAppeal/>
              <AppealInfo/>
              <FirstCheckResult />
              <SecondCheckResult />
            </div>
          )}
        </div>
        <footer style={{ textAlign: 'right', marginTop: '20px' }}>
          <BIButton onClick={() => router.goBack()} style={{marginRight:'15px'}}>返回</BIButton>
          <BIButton type='primary' onClick={() => router.goBack()}>提交申诉</BIButton>
        </footer>
      </div>
    );
  }
}

export default FirstAppealCreate;
