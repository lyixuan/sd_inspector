import React from 'react';
import { connect } from 'dva';

import styles from './style.less'

@connect((xdManagementBench) => ({
  xdManagementBench,
}))
class TreeNames extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dimensionId: ''
    }
  }
  componentDidMount() {
  }
  clickTag = (tag) =>{
    this.setState({
      dimensionId: tag.dimensionId
    })
    this.props.clickTag(tag);
  }
  getInit = dimensions => {
    if (!this.state.dimensionId && dimensions.length > 0) { // dimensionId
      this.setState({dimensionId: dimensions[0].dimensionId });
    }
    return this.state.dimensionId;
  }
  render() {
    const { dimensions = [] } = this.props;
    const dimensionId = this.getInit(dimensions);
    return (
      <div className={styles.treeMain}>
        {dimensions.length>0 && dimensions.map((item)=><span className={item.dimensionId === dimensionId ? styles.active : ""} key={item.dimensionId} onClick={()=>this.clickTag({ dimensionId: item.dimensionId })}>{item.name}</span>)}
      </div>
    );
  }
}

export default TreeNames;
