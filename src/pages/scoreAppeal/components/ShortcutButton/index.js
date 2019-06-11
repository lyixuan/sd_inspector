/**
*
* ids: id数组  必传 Array
* */


import React from 'react';
import styles from './style.less';
import { Button,Icon } from 'antd';
import AuthButton from '@/components/AuthButton/index';

class ShortcutButton extends React.Component {
  changePage = (ids,currentId,direction)=>{
    console.log(ids)
    if (this.props.onChangePage) {
      this.props.onChangePage(ids,currentId,direction);
    } else {
      console.warn('未传入 onChangePage function')
    }
  };

  jump=(state)=>{
    if (this.props.onJumpAppeal) {
      this.props.onJumpAppeal(state);
    } else {
      console.warn('未传入 onJumpAppeal function')
    }
  };
  render() {
    const {ids=[],currentId,status} = this.props;

    const mid = function() {
      if ((status === 1||status === 2) && AuthButton.checkPathname('/scoreAppeal/appeal/dockingMan')){
        return '审核'
      } else if ((status === 5||status === 6) && AuthButton.checkPathname('/scoreAppeal/appeal/master')) {
        return '审核'
      } else {
        return ''
      }
    };
    return (
      <div style={{width:'100%',textAlign:'center'}}>
        <Button className='smBtn' size="small" onClick={()=>this.changePage(ids,currentId,'up')} >
          <Icon type="left" />上一条
        </Button>
        <span onClick={()=>this.jump(2)} className={styles.sh}>{mid()}</span>
        <Button className='smBtn' size="small" onClick={()=>this.changePage(ids,currentId,'down')} >
          下一条<Icon type="right" />
        </Button>
      </div>
    );
  }
}

export default ShortcutButton;
