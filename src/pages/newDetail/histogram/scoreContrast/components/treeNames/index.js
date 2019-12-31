import React from 'react';
import { connect } from 'dva';
import styles from './style.less';

const { BI = {} } = window;
@connect(({ global }) => ({
  globalUserTypes: global.globalUserTypes || {}
}))
class TreeNames extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dimensionId: 1
    }
  }
  componentDidMount() {
    const admin_user = localStorage.getItem('admin_user');
    const userType = JSON.parse(admin_user) ? JSON.parse(admin_user).userType : undefined;
    this.setState({
      traceName: this.props.globalUserTypes[userType]
    })
  }
  clickTag = (tag) =>{
    this.setState({
      dimensionId: tag.dimensionId
    })
    BI.traceV && BI.traceV({ "widgetName": tag.name, "traceName": `${this.state.traceName}工作台${tag.name}` });
    this.props.clickTag({dimensionId: tag.dimensionId});
  }
  render() {
    const { dimensions = [] } = this.props;
    const { dimensionId } = this.state;
    return (
      <div className={styles.treeMain}>
        {
          dimensions.length > 0 &&
          dimensions.map(item => <span className={item.dimensionId === dimensionId ? styles.active : (item.dataType ? styles[`d${item.dataType}`] : '')}
            key={item.dimensionId}
            onClick={()=>this.clickTag(item)}
          >
            {item.name}
          </span>)
        }
      </div>
    );
  }
}

export default TreeNames;
