import React from 'react';
import stylefather from '../indexPage.less';
import shensu from '@/assets/shensu@2x.png';
import gengduo from '@/assets/newIndex/gengduo@2x.png';
import style from './style.less';

class Appeal extends React.Component {
  render() {
    const { WorkbenchNpsData } = this.props;
    console.log(WorkbenchNpsData, 'WorkbenchNpsDatas');
    return (
      <div className={stylefather.boxRight}>
        <div className={stylefather.boxHeader}>
          <img src={shensu} />
          <span className={stylefather.headerTitle}>学分申诉</span>
          <img src={gengduo} alt="" />
        </div>
      </div>
    );
  }
}

export default Appeal;
