import React from 'react';
import stylefather from '../indexPage.less';
import chuangshou from '@/assets/newIndex/chuangshou@2x.png';
import gengduo from '@/assets/newIndex/gengduo@2x.png';
import style from './style.less';

class Income extends React.Component {
  render() {
    const { WorkbenchScore } = this.props;
    return (
      <div className={stylefather.boxRight}>
        <div className={stylefather.boxHeader}>
          <img src={chuangshou} alt=""/>
          <span className={stylefather.headerTitle}>创收</span>
          <img src={gengduo} alt=""/>
        </div>
      </div>
    );
  }
}

export default Income;
