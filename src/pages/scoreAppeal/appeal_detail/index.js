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
        <ScorePersonInfo />
        <div className={styles.spaceLine} />
        <SubOrderDetail />
        <div className={styles.spaceLine} />

        <ScoreBasicInfo />
        <div className={styles.spaceLine} />

        <AppealInfo
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
