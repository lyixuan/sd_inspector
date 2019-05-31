/**
*
* ids: id数组  必传 Array
* */


import React from 'react';
import styles from './style.less';
import { Button,Icon } from 'antd';

class ShortcutButton extends React.Component {
  changePage = (ids,currentId,direction)=>{
    if (this.props.onChangePage) {
      this.props.onChangePage(ids,currentId,direction);
    } else {
      console.warn('未传入 onChangePage function')
    }
  };

  jump=()=>{
    if (this.props.onJumpAppeal) {
      this.props.onJumpAppeal();
    } else {
      console.warn('未传入 onJumpAppeal function')
    }
  }
  render() {
    const {ids=[],currentId} = this.props;

    return (
      <div>
        <Button className='smbtn' size="small" onClick={()=>this.changePage(ids,currentId,'up')} >
          <Icon type="left" />
          上一条
        </Button>
        <span onClick={()=>this.jump()} className={styles.sh}>审核</span>
        <Button className='smbtn' size="small" onClick={()=>this.changePage(ids,currentId,'down')} >
          下一条
          <Icon type="right" />
        </Button>
      </div>
    );
  }
}

export default ShortcutButton;
