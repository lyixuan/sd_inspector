import React from 'react';
import { Spin,Empty } from 'antd';
import ScoreItem from './ScoreItem';
import UserInfo from '../../components/userInfo';
import styles from './style.css';

export default class Score extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapseList:[true]
    };
  }
  clickBar = (index) =>{
    if(this.state.collapseList[index]===undefined){
      this.state.collapseList[index]=true;
      this.setState({
        collapseList:this.state.collapseList
      })
    } else {
      this.state.collapseList[index] = !this.state.collapseList[index];
      this.setState({
        collapseList:this.state.collapseList
      })
    }
  }
  render() {
    const { info={},stuId,scoreData={},isLoading=false}  = this.props;
    const {list=[]} = scoreData||{};

    const scoreList = list && list.map((listItem,i)=>
      <ScoreItem key={i} listItem={listItem} index={i} clickBar={this.clickBar} collapse={this.state.collapseList[i]}/>
    );
    return (
      <Spin spinning={isLoading}>
        {list.length>0?
          <div  className={styles.layout}>
            <div className={styles.leftContent}>
              {scoreList}
            </div>
            <div className={styles.userInfo}>
              <UserInfo info={info} />
            </div>
          </div>:
          <div className={styles.layout1}>
            <div className={styles.contentLayout} style={{minHeight:800,marginBottom:20,paddingTop:50}}><Empty/> </div>
          </div>
        }
      </Spin>
    );
  }
}
