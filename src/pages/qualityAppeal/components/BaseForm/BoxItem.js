import React  from 'react';
import styles from './boxItem.css';

class Box extends React.Component {
  render() {
    const { label,required,textAline,children } = this.props;
    return (
      <div className={`${styles.formColLeft}`}>
        {required?"*":""}<span className={styles.formLabel}>{label}</span>：
        {children}
      </div>
    );
  }
}

export default Box;
