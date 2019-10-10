import React  from 'react';
import styles from './boxItem.css';

class BoxItem extends React.Component {
  render() {
    const { label,required,oneRow,children } = this.props;
    return (
      <div className={oneRow?styles.formColCenter:styles.formColLeft}>
        {required?<span>*</span>:<span style={{color:'transparent'}}>*</span>}<span className={styles.formLabel}>{label}</span>：
        {children}
      </div>
    );
  }
}

export default BoxItem;
