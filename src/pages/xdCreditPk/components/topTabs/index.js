import React from 'react';
import styles from './style.less';
import BITabs from '@/ant_components/BITabs';

const TabPane = BITabs.TabPane;
class TopTabs extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      keye: this.props.keye ? this.props.keye : '1'
    }
  }
  onTabChange = (val) => {
    this.setState({
      keye: val
    })
    if(this.props.onTabChange){
      this.props.onTabChange({keye: val})
    }
  };
  render() {
    const { keye } = this.state;
    return (
      <div className={styles.topTab} style={this.props.style}>
        <BITabs onChange={this.onTabChange} type="card" activeKey={keye}>
          {this.props.children}
        </BITabs>
        <div className={styles.topRight}>{this.props.right}</div>
      </div>
    );
  }
}

export default TopTabs;
TopTabs.TabPane = TabPane;
