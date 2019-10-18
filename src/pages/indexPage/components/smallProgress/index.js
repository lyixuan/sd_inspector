import React from 'react';
import styles from './style.less'
class SmallProgress extends React.Component {
  render() {
    const {percent,isColor} = this.props
    return(
      <>
      <div className={styles.progressBg} style={this.props.style}>
        <div className ={`${styles.progressCenter} ${isColor==="green"?styles.progressGreen:styles.progressRed}`} style={{width:percent}}></div>
      </div>
      </>
    )
  }
}
export default SmallProgress;
