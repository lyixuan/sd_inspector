import React from 'react';
import stylefather from '../indexPage.less';
import NpsImg from '@/assets/NPS@2x.png';
import gengduo from '@/assets/newIndex/gengduo@2x.png';
import style from './style.less';
class Nps extends React.Component {
  render() {
    const { WorkbenchNpsData } = this.props;
    console.log(WorkbenchNpsData, 'WorkbenchNpsDatas');
    return (
      <div className={stylefather.boxRight}>
        <div className={stylefather.boxHeader}>
          <img src={NpsImg} />
          <span className={stylefather.headerTitle}>NPS分析</span>
          <img src={gengduo} alt="" />
        </div>
        <div></div>
      </div>
    );
  }
}

export default Nps;
