import React from 'react';
import { Drawer } from 'antd';
import styles from './style.less';

class BIDrawer extends React.Component {
  onClose = () => {
    const { onClose } = this.props;
    if (onClose && typeof onClose === 'function') {
      onClose();
    }
  }
  onOpen = () => {
    const { onOpen } = this.props;
    if (onOpen && typeof onOpen === 'function') {
      onOpen();
    }
  }
  render() {
    const { visible, drawerStyle = {} } = this.props;
    return (
      <div className={`${styles.BIDrawer} ${visible ? styles.BIDrawerOpen : ''}`}>
        <div className={styles.openWrapper}>
          <div onClick={this.onClose} class={styles.drawerMask}></div>
          <div className={styles.drawer}>
            <span onClick={this.onClose} className={styles.toggleClose}>收起PK小组 {'<'}</span>
            <div className={styles.drawerBody} style={drawerStyle}>
              {this.props.children}
            </div>
          </div>
        </div>
        {!visible ? <span onClick={this.onOpen} className={styles.toggleOpen}>展开PK小组 {'>'}</span> : ''}
      </div>    
    );
  }
}

export default BIDrawer;
