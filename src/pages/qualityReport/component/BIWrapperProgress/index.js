import React from 'react';
import SmallProgress from '@/pages/indexPage/components/smallProgress';
import checkIcon from '@/assets/component/checkicon.png';
import styles from './style.less';

class BIWrapperProgress extends React.Component {
  render() {
    const {text, percent, isColor='green', iconed, propsStyle, ...props} = this.props;
    return(
      <div className={styles.BIWrapperProgress} {...props}>
        <div className={styles.pro} style={propsStyle}>
            <span>{text}</span>
            <SmallProgress isColor={isColor} percent={percent} style={{width: '100%'}}/>
        </div>
        {iconed ? <img src={checkIcon} alt='icon'/> : ''}
      </div>
    )
  }
}
export default BIWrapperProgress;
