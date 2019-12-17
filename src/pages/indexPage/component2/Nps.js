import React from 'react';
import stylefather from '../indexPage.less';
import style from './style.less';

class Nps extends React.Component {
  render() {
    const { WorkbenchNpsData } = this.props;
    console.log(WorkbenchNpsData, 'WorkbenchNpsDatas');
    return (
      <div className={stylefather.boxLeft}>
        <div className={stylefather.boxHeader}></div>
      </div>
    );
  }
}

export default Nps;
