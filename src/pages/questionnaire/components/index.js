import React from 'react';
import blue from '@/assets/questionnaire/red.svg';
import styles from './style.less';

class QContainer extends React.Component {
  render() {
    return (
      <div className={styles.qContainer}>
          <div className={styles.title}>
            <img src={blue} alt=''/>
          </div>
      </div>
    );
  }
}

export default QContainer;
