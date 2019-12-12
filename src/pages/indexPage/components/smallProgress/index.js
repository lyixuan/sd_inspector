import React from 'react';
import styles from './style.less'
class SmallProgress extends React.Component {
  getColorCalss = () => {
    const { isColor } = this.props;
    if (isColor === 'green') {
      return styles.progressGreen;
    } else if (isColor === 'leftred') {
      return styles.leftRed;
    } else if (isColor === 'blue') {
      return styles.blue;
    } else {
      return styles.progressRed;
    }
  }
  render() {
    const { percent } = this.props;
    return (
      <>
        <div className={styles.progressBg} style={this.props.style}>
          {percent && percent !== '0%' && percent !== 'NaN%' ? <div className={`${styles.progressCenter} ${this.getColorCalss()}`} style={{ width: percent }}></div> : ''}
        </div>
      </>
    )
  }
}
export default SmallProgress;
