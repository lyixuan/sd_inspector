import React from 'react';
import style from './style.less';
import moment from 'moment';
import Quality from './Quality';
import Appeal from './Appeal';
import { handleDataTrace } from '@/utils/utils';

class QualityAppeal extends React.Component {
  onBeforePlay = () => {};
  render() {
    const { WorkbenchNpsData } = this.props;
    return (
      <div className={style.scoreWrap}>
        <div className={style.scoreHeader}>
          <span className={style.leftLine} /> <span className={style.leftText}>质检/学分申诉</span>
        </div>
        <Quality />
        <Appeal />
      </div>
    );
  }
}

export default QualityAppeal;
