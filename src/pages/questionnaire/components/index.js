import React from 'react';
import round from '@/assets/questionnaire/round.svg';
import styles from './style.less';

class QContainer extends React.Component {
  render() {
    return (
      <div className={styles.qContainer}>
          <div className={styles.title}>
            <img src={round} alt=''/>
          </div>
      </div>
    );
  }
}

export default QContainer;
