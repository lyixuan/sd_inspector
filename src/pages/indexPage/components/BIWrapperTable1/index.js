import React from 'react';
import { Table } from 'antd';
import styles from './style.less';
import { Scrollbars } from 'react-custom-scrollbars';

/*
 * Table 组件
 *
 * 基于原 ant Table
 * 只扩展自定义样式
 * */

 // 滚动条参数
const scroll = {
  // 如果最终结果表格内容与表格头部无法对齐。
  // 表格头需要增加空白列，弹性布局
   width: '100%',
   // 最大高度，内容超出该高度会出现滚动条
   height: 600,
}
class BIWrapperTable1 extends React.Component {
  componentDidMount() {
    //  覆盖ant design 自带滚动条样式
    document.querySelector('.ant-table-scroll > .ant-table-body').style.overflow='hidden';
    // 滚动条组件ref，重新设置滚动位置
    this.scrollbarsRef = React.createRef();
  }
   // 组件重新渲染，重新设置滚动条的位置
	componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.scrollbarsRef.current){
        this.scrollbarsRef.current.scrollTop(this.scrollTop);
    }
}

  render() {
    // 词法作用域
		const self = this;
		
		// 用react-custom-scrollbars包裹住表格内容
        const components = {
            table (props) {
                const { className } = props;
                return (
                    <Scrollbars 
                        autoHide
                        style={scroll}
                        onScrollStop={self.handleScrollStop}
                        ref={ self.scrollbarsRef } >
                        <table className={className}>
                        { props.children }
                        </table>
                    </Scrollbars>
                )
            }
          }
    return (     
      <div
        id={this.props.name}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        style={{ minHeight: this.props.xScroll ? this.state.tableHeight + 'px' : '' }}
        className={`${styles.BIWrapperTable} ${this.props.isEditTd ? styles.BIWrapperTable4 : ''}`}
      >
        <Table 
        {...this.props} 
        components={components}
        scroll={{y: scroll.height, x: scroll.width}}
        />
      </div>
    );
  }
}

export default BIWrapperTable1;
