import React from 'react';
import BIScrollbarTable from '@/ant_components/BIScrollbarTable';
import styles from './style.less';

/*
 * BIScrollbarTable 组件
 *
 * 基于原 ant Table
 * 只扩展自定义样式
 * 
 * */


class BITotalTable extends React.Component {
  render() {
    return (
      <span className={styles.BITotalTable}>
        <BIScrollbarTable
          {...this.props}
        />
      </span>
    );
  }
}

export default BITotalTable;
