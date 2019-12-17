import React from 'react';
import style from './style.less';
import moment from 'moment';
import Income from './Income';
import Score from './Score';
import { handleDataTrace } from '@/utils/utils';

class ScoreIncome extends React.Component {

  onBeforePlay=()=>{
  };
  render() {
    const { WorkbenchScore,date } = this.props;
    return (
      <div className={style.scoreWrap}>
        <div className={style.scoreHeader}>
          <span className={style.leftLine}/> <span className={style.leftText}>学分绩效</span>
          <span className={style.date}>{moment(new Date(date.startDate)).format('YYYY.MM.DD')} ~ {moment(new Date(date.endDate)).format('YYYY.MM.DD')}</span>
        </div>
        <Score WorkbenchScore={WorkbenchScore}/>
        <Income WorkbenchScore={WorkbenchScore}/>
      </div>
    );
  }
}

export default ScoreIncome;
