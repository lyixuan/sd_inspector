import React from 'react';
import stylefather from '../indexPage.less';
import xuefen from '@/assets/newIndex/xuefen@2x.png';
import gengduo from '@/assets/newIndex/gengduo@2x.png';
import style from './style.less';

class Score extends React.Component {
  render() {
    const { WorkbenchScore } = this.props;
    return (
      <div className={stylefather.boxLeft}>
        <div className={stylefather.boxHeader}>
          <img src={xuefen} alt=""/>
          <span className={stylefather.headerTitle}>学分</span>
          <img src={gengduo} alt=""/>
        </div>

      </div>
    );
  }
}

export default Score;
