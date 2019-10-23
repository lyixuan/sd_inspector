import React from 'react';
import { connect } from 'dva';

import styles from './style.less'

@connect((xdWorkModal) => ({
  xdWorkModal,
}))
class TreeNames extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      treeData:[{
        name:"学分均分",
        id:1,
        isActive:false
      },{
        name:"有效直播",
        id:2,
        isActive:false
      },{
        name:"有效重播",
        id:3,
        isActive:false
      },{
        name:"课后作业",
        id:4,
        isActive:false
      },{
        name:"智能推题",
        id:5,
        isActive:false
      }]
    }
  }
  componentDidMount() {
    this.clickTag(this.state.treeData[0])
  }
  clickTag = (tag) =>{
    this.state.treeData.map((item)=>{
      if(item.id == tag.id){
        item.isActive = true
      }else{
        item.isActive = false
      }
    })
    this.setState({
      treeData:this.state.treeData
    })
  }
  render() {
    // const { userId} = this.state;
    const {treeData} = this.state
    return (
      <div className={styles.treeMain}>
        {treeData.map((item)=><span className={item.isActive?styles.active:""} key={item.id} onClick={()=>this.clickTag(item)}>{item.name}</span>)}
      </div>
    );
  }
}

export default TreeNames;
