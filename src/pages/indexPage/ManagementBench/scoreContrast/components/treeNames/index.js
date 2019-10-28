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
      treeData:[]
    }
  }
  componentDidMount() {
    this.clickTag(this.state.treeData[0])
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    // if (this.props.dimensions !== nextProps.dimensions) {
    //   nextProps.dimensions.map((item)=>{
    //     item.isActive = false
    //   })
    //   this.setState({
    //     treeData:nextProps.dimensions
    //   })
    //   setTimeout(()=>{
    //     console.log("nextProps.dimensions",nextProps.dimensions,this.state.treeData)
    //     // this.clickTag(nextProps.dimensions[0])
    //   },200)
    //
    // }
  }
  clickTag = (tag) =>{
    console.log("treeData",this.state.treeData)
    this.state.treeData.map((item)=>{
      if(item.dimensionId == tag.dimensionId){
        item.isActive = true
      }else{
        item.isActive = false
      }
    })
    tag && this.props.clickTag(tag.dimensionId)
    this.setState({
      treeData:this.state.treeData
    })
  }

  render() {
    // const { userId} = this.state;
    const {treeData=[]} = this.state
    return (
      <div className={styles.treeMain}>
        {treeData.length>0 && treeData.map((item)=><span className={item.isActive?styles.active:""} key={item.dimensionId} onClick={()=>this.clickTag(item)}>{item.name}</span>)}
      </div>
    );
  }
}

export default TreeNames;
