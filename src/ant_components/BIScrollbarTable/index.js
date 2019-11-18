import React from 'react';
import BITable from '@/ant_components/BITable';
import BIScrollbar from '@/ant_components/BIScrollbar';
import styles from './style.less';

/*
 * BIScrollbarTable 组件
 *
 * 基于原 ant Table
 * 只扩展自定义样式
 *  scrollBar={{ height: 1000 }}// 这两个参数必须一致
            scroll={{y: 1000}} // 这两个参数必须一致
 * */


class BIScrollbarTable extends React.Component {
  getTableComponents = () => {
    const { scrollBar } = this.props;
    return {
      table (props) {
          return (
            <BIScrollbar style={scrollBar ? scrollBar : {}} >
                <table className={props.className}>
                  { props.children }
                </table>
            </BIScrollbar>
          )
      }
    };
  }
  render() {
    const { components , ...props} = this.props;
    return (
      <span className={styles.BIScrollbarTable}>
        <BITable
          components={this.getTableComponents()}
          {...props}
        />
      </span>
    );
  }
}

export default BIScrollbarTable;
