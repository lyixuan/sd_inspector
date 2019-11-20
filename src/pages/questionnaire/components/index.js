import React from 'react';
import round from '@/assets/questionnaire/round.svg';
import styles from './style.less';

class QContainer extends React.Component {
  render() {
    const { propsStyle = {}, children, ...props } = this.props;
    return (
      <div className={styles.qContainer} {...props}>
          <div className={styles.title}>
            <img src={round} alt=''/>
          </div>
          <div style={propsStyle}>
            {children}
          </div>
      </div>
    );
  }
}

export default QContainer;
