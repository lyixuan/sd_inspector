import React from 'react';
import styles from './style.less';
import { connect } from 'dva';
import ScorePersonInfo from '../components/scorePersonInfo';
import ScoreBasicInfo from '../components/scoreBasicInfo';
import SubOrderDetail from '../components/subOrderDetail';
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
    const {collapse1,collapse2,tags=[{id:1,name:'jdjl'}],checkedTags} = this.state;
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
              <div className={styles.spaceLine}/>
            </div>
          )}
        </div>
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
    );
  }
}

export default AppealCheck;
