import React from 'react';
import BaseInfo from './baseInfo';
import styles from './style.css';

export default class UserPortary extends React.Component {
  render() {

    const { baseInfo={} } = this.props;

    return (
      <div className={styles.layout}>
        <BaseInfo baseInfo={baseInfo}/>
      </div>
    );
  }
}
