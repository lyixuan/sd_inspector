import React from 'react';
import styles from './style.less';
import { connect } from 'dva';
import { Spin } from 'antd';
import AppealInfo from './components/appealInfo';
import FirstCheckResult from './components/firstCheckResult';
import ScorePersonInfo from './components/scorePersonInfo';
import ScoreBasicInfo from './components/scoreBasicInfo';
import SubOrderDetail from './components/subOrderDetail';
import SecondCheckResult from './components/secondCheckResult';
import UploadImgs from './components/uploadImgs';
import router from 'umi/router';
import BIButton from '@/ant_components/BIButton';

class NewQualitySheetIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = { qualityInfoCollapse: true, appealInfoCollapse: [] };
  }
  componentDidMount() {}
  handleAppealInfoCollapse(index) {
    this.state.appealInfoCollapse[index] = !this.state.appealInfoCollapse[index];
    this.setState({ appealInfoCollapse: this.state.appealInfoCollapse });
  }

  handleCollapse() {
    this.setState({ qualityInfoCollapse: !this.state.qualityInfoCollapse });
  }
  render() {
    return (
      <div className={styles.detailContainer}>
        {/* 学分归属人信息 */}
        <ScorePersonInfo />
        <div className={styles.spaceLine} />
        {/* 子订单详情 */}
        <SubOrderDetail />
        <div className={styles.spaceLine} />
        {/* 申诉基础信息 */}
        <ScoreBasicInfo />
        <div className={styles.spaceLine} />
        {/* 一次申诉 firstCheckResult——对接人 ；secondCheckResult——主管 */}
        <AppealInfo
          uploadImgs={<UploadImgs type="preview" />}
          firstCheckResult={<FirstCheckResult />}
          secondCheckResult={<SecondCheckResult />}
        />
        <footer style={{ textAlign: 'right', marginTop: '20px' }}>
          <BIButton onClick={() => router.goBack()}>返回</BIButton>
        </footer>
      </div>
    );
  }
}

export default NewQualitySheetIndex;
