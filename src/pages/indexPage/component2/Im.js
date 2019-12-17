import React from 'react';
import stylefather from '../indexPage.less';
import IMImg from '@/assets/IM@2x.png';
import style from './style.less';

class Im extends React.Component {
  render() {
    const { WorkbenchScore } = this.props;
    return (
      <div className={stylefather.boxRight}>
        <div className={stylefather.boxHeader}>
          <img src={IMImg} />
        </div>
      </div>
    );
  }
}

export default Im;
