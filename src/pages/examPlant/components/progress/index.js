import React from 'react';
import styles from './style.less'
import { thousandsFormat } from '@/utils/utils';

class SmallProgress extends React.Component {
  getColorCalss = () => {
    const { isColor } = this.props;
    if (isColor === 'green') {
      return styles.progressGreen;
    } else if (isColor === 'leftred') {
      return styles.leftRed;
    } else {
      return styles.progressRed;
    }
  }
  render() {
    const { percent } = this.props;
    return (
      <>
        <div className={styles.progressBg} style={this.props.style}>
          {percent && percent !== '0%' && percent !== 'NaN%' ? <div className={`${styles.progressCenter} ${this.getColorCalss()}`} style={{ width: percent, textAlign: 'left' }}>{thousandsFormat(parseInt(this.props.text))}{}</div> : <span style={{ paddingLeft: '4px' }}>{this.props.text}</span>}
        </div>
      </>
    )
  }
}
export default SmallProgress;
