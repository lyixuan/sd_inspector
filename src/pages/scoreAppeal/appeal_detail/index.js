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
import Tags from '@/pages/scoreAppeal/components/Tags';
import ShortcutButton from '@/pages/scoreAppeal/components/ShortcutButton';
class NewQualitySheetIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = { qualityInfoCollapse: true, appealInfoCollapse: [],newId:1 };
  }
  componentDidMount() {}
  handleAppealInfoCollapse(index) {
    this.state.appealInfoCollapse[index] = !this.state.appealInfoCollapse[index];
    this.setState({ appealInfoCollapse: this.state.appealInfoCollapse });
  }

  handleCollapse() {
    this.setState({ qualityInfoCollapse: !this.state.qualityInfoCollapse });
  }

  onTagChangeFun(item) {
    console.log(item)
  }
  onChangePage(ids,currentId,direction){
    console.log(ids,currentId,direction)
    if (ids.indexOf(currentId)===-1){
      this.setState({
        newId: ids[0]
      })
    } else {
      if (direction==='up'){
        if (ids.indexOf(currentId)===0){
          this.setState({
            newId: ids[ids.length-1]
          })
        } else {
          this.setState({
            newId: ids[ids.indexOf(currentId)-1]
          })
        }
      } else {
        if (ids.indexOf(currentId)+1 === ids.length){
          this.setState({
            newId: ids[0]
          })
        } else {
          this.setState({
            newId: ids[ids.indexOf(currentId)+1]
          })
        }
      }
    }
  }

  onJumpAppeal(){
    console.log('jump')
  }
  render() {
    const tags = [{id:1,name:'标签1'},{id:2,name:'标签2'},{id:3,name:'标签3'},{id:4,name:'标签4'}]
    const checkedTags = [2,3]
    const ids = [1,2,3,4,5,6]
    const {newId} = this.state;

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
          firstCheckResult={<FirstCheckResult />}
          secondCheckResult={<SecondCheckResult />}
        />
        <Tags tags={tags} checkedTags={checkedTags}  onTagChange={(item)=>this.onTagChangeFun(item)} />
        <ShortcutButton ids={ids} currentId={newId}  onChangePage={(ids,currentId,direction)=>this.onChangePage(ids,currentId,direction)} onJumpAppeal={()=>this.onJumpAppeal()}/>
        <footer style={{ textAlign: 'right', marginTop: '20px' }}>
          <BIButton onClick={() => router.goBack()}>返回</BIButton>
        </footer>
      </div>
    );
  }
}

export default NewQualitySheetIndex;
