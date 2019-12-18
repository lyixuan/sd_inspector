import React from 'react';
import style from './style.less';
import moment from 'moment';
import Im from './Im';
import Nps from './Nps';
import { handleDataTrace } from '@/utils/utils';

class ImNps extends React.Component {
  onBeforePlay = () => {};
  render() {
    const { WorkbenchNpsData } = this.props;
    return (
      <div className={style.scoreWrap}>
        <div className={style.scoreHeader}>
          <span className={style.leftLine} /> <span className={style.leftText}>学院反馈</span>
        </div>
        <Im />
        <Nps />
      </div>
    );
  }
}

export default ImNps;
