import React from 'react';
import stylefather from '../indexPage.less';
import IMImg from '@/assets/IM@2x.png';
import gengduo from '@/assets/newIndex/gengduo@2x.png';
import style from './style.less';

class Im extends React.Component {
  render() {
    const { WorkbenchScore } = this.props;
    return (
      <div className={stylefather.boxLeft}>
        <div className={stylefather.boxHeader}>
          <img src={IMImg} />
          <span className={stylefather.headerTitle}>IM分析</span>
          <img src={gengduo} alt="" />
        </div>
      </div>
    );
  }
}

export default Im;
