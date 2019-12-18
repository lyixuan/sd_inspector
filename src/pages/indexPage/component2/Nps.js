import React from 'react';
import stylefather from '../indexPage.less';
import NpsImg from '@/assets/NPS@2x.png';
import gengduo from '@/assets/newIndex/gengduo@2x.png';
import style from './style.less';
import Echarts from '@/components/Echart';
import { getOption } from './getNpsOptions.js';


const options =  [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149, 210, 122, 133, 334, 198, 123, 125, 220];
class Nps extends React.Component {
  render() {
    const { WorkbenchNpsData } = this.props;
    const options = getOption(options);
    return (
      <div className={stylefather.boxRight}>
        <div className={stylefather.boxHeader}>
          <img src={NpsImg} />
          <span className={stylefather.headerTitle}>NPS分析</span>
          <img src={gengduo} alt="" />
        </div>
        <div className={style.imContentRight}>
          <Echarts options={options} style={{ height: 275 + 'px', top: '-49px' }} />
        </div>
      </div>
    );
  }
}

export default Nps;
