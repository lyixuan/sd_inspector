import React from 'react';
import { connect } from 'dva';
import styles from './style.less';

@connect((xdWorkModal) => ({
  xdWorkModal,
}))
class PageTab extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      keye: 1
    }
  }

  onTabChange = (keye) => {
    this.setState({  keye })
    if(this.props.onTabChange){
      this.props.onTabChange(keye);
    }
  };
  render() {
    const { tabs=[] } = this.props;
    const { keye } = this.state;
    return (
      <div className={styles.pageTab}>
        <div className={styles.tabTitle}>
          <div>
            {tabs.map((item, index) => <span className={keye === index+1 ? styles.active : ''} onClick={() => this.onTabChange(index + 1)} key={index}>{item.title}</span>)}
          </div>
        </div>
        <div className={styles.tabContainer}>
          {tabs.map((item, index) => <div className={keye !== index+1 ? styles.tabHidden : ''} key={index}>{item.children}</div>)}      
        </div>
      </div>
    );
  }
}

export default PageTab;
