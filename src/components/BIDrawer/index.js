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
    const { visible, drawerStyle = {}, openValue='展开PK小组', closeValue='收起PK小组'} = this.props;
    return (
      <div className={`${styles.BIDrawer} ${visible ? styles.BIDrawerOpen : ''}`}>
        <div className={styles.openWrapper}>
          <div onClick={this.onClose} className={styles.drawerMask}></div>
          <div className={styles.drawer} style={drawerStyle}>
            <span onClick={this.onClose} className={styles.toggleClose}>
              {closeValue}
              <img src={closeImg} alt=''/></span>
            <div className={styles.drawerBody}>
              {this.props.children}
            </div>
          </div>
        </div>
        {!visible ? <span onClick={this.onOpen} className={styles.toggleOpen}>
          {openValue}
          <img src={openImg} alt=''/></span> : ''}
      </div>    
    );
  }
}

export default BIDrawer;
