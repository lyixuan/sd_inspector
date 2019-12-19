import React from 'react';
import style from './style.less';
import moment from 'moment';
import Income from './Income';
import Score from './Score';

import { handleDataTrace } from '@/utils/utils';

class ScoreIncome extends React.Component {

  render() {
    const { WorkbenchScore,WorkbenchIncome,date } = this.props;
    const admin_user = localStorage.getItem('admin_user');
    const userType = JSON.parse(admin_user) ? JSON.parse(admin_user).userType :'';
    return (
      <div className={style.scoreWrap}>
        <div className={style.scoreHeader}>
          <span className={style.leftLine}/> <span className={style.leftText}>学分/创收</span>
          <span className={style.date}>{moment(new Date(date.startDate)).format('YYYY.MM.DD')} ~ {moment(new Date(date.endDate)).format('YYYY.MM.DD')}</span>
        </div>
        <Score date={date} WorkbenchScore={WorkbenchScore} userType={userType}/>
        <Income WorkbenchIncome={WorkbenchIncome} userType={userType}/>
      </div>
    );
  }
}

export default ScoreIncome;
