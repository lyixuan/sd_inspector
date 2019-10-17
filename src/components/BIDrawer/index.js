import React from 'react';
import styles from './style.less';
import closeImg from '@/assets/component/close.png';
import openImg from '@/assets/component/open.png'


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
          <div className={styles.drawer} style={drawerStyle}>
            <span onClick={this.onClose} className={styles.toggleClose}>
              <span>收</span>
              <span>起</span>
              <span>PK</span>
              <span>小</span>
              <span>组</span> 
              <img src={closeImg} alt=''/></span>
            <div className={styles.drawerBody}>
              {this.props.children}
            </div>
          </div>
        </div>
        {!visible ? <span onClick={this.onOpen} className={styles.toggleOpen}>
          <span>展</span>
          <span>开</span>
          <span>PK</span>
          <span>小</span>
          <span>组</span> 
          <img src={openImg} alt=''/></span> : ''}
      </div>    
    );
  }
}

export default BIDrawer;
