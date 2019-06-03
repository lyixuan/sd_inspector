import React from 'react';
import styles from './style.less';
import { connect } from 'dva';
import { Spin } from 'antd';
import ScorePersonInfo from '../components/scorePersonInfo';
import ScoreBasicInfo from '../components/scoreBasicInfo';
import SubOrderDetail from '../components/subOrderDetail';
import UploadImgs from '../components/uploadImgs';
import FirstAppealEdit from '../components/firstAppealEdit';
import router from 'umi/router';
import BIButton from '@/ant_components/BIButton';
import Tags from '@/pages/scoreAppeal/components/Tags';
import ShortcutButton from '@/pages/scoreAppeal/components/ShortcutButton';

class FirstAppealCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      qualityInfoCollapse: true,
      appealInfoCollapse: [],
      newId: 1 };
  }

  componentDidMount() {
  }

  handleAppealInfoCollapse(index) {
    this.state.appealInfoCollapse[index] = !this.state.appealInfoCollapse[index];
    this.setState({ appealInfoCollapse: this.state.appealInfoCollapse });
  }

  handleCollapse() {
    this.setState({ qualityInfoCollapse: !this.state.qualityInfoCollapse });
  }

  onTagChangeFun(item) {
    console.log(item);
  }

  onChangePage(ids, currentId, direction) {
    console.log(ids, currentId, direction);
    if (ids.indexOf(currentId) === -1) {
      this.setState({
        newId: ids[0],
      });
    } else {
      if (direction === 'up') {
        if (ids.indexOf(currentId) === 0) {
          this.setState({
            newId: ids[ids.length - 1],
          });
        } else {
          this.setState({
            newId: ids[ids.indexOf(currentId) - 1],
          });
        }
      } else {
        if (ids.indexOf(currentId) + 1 === ids.length) {
          this.setState({
            newId: ids[0],
          });
        } else {
          this.setState({
            newId: ids[ids.indexOf(currentId) + 1],
          });
        }
      }
    }
  }

  onJumpAppeal() {
    console.log('jump');
  }

  render() {
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
        <FirstAppealEdit/>
        <footer style={{ textAlign: 'right', marginTop: '20px' }}>
          <BIButton onClick={() => router.goBack()}>返回</BIButton>
        </footer>
      </div>
    );
  }
}

export default FirstAppealCreate;
