import React  from 'react';
import styles from './box.css';

class Box extends React.Component {
  render() {
    const { title,children } = this.props;
    return (
      <div className={styles.boxWrap}>
        <div className={styles.title}>
          {title}
        </div>
        <div className={styles.boxWrap2}>
          {children}
        </div>
      </div>
    );
  }
}

export default Box;
