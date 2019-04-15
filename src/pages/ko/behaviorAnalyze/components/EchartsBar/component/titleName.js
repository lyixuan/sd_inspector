import React from 'react';
import styles from './titleName.less';

class Title extends React.Component {

  render() {
    const {name} = this.props;
    return (
      <div className={styles.titleWrap}>
       <span className={styles.nameCls}>{name}</span>
      </div>
    );
  }
}

export default Title;
