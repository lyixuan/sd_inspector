import React from 'react';
import moment from 'moment';
import Styles from './style.css';
import { STATIC_HOST } from '@/utils/constants';

export default class IllegalInfoComponent extends React.Component {
  render() {
    const {data}= this.props;
    const {violationDate,qualityType,reduceScoreDate,dimension,violationLevelName,qualityValue,attUrl,desc,primaryAssortment,secondAssortment,thirdAssortment} = data;
    return (
      <section className={Styles.personInfoCon}>
        <div className={Styles.container}>
          <div className={Styles.secRow}>
            <div>质检违规日期：{violationDate?moment(violationDate).format('YYYY-MM-DD'):null}</div>
            <div>质检类型：{Number(qualityType) === 1 ? '客诉质检' : '班主任质检'}</div>
            <div>违规分类：{primaryAssortment}{secondAssortment?`| ${secondAssortment}`:null}{thirdAssortment?`| ${thirdAssortment}`:null}</div>
          </div>
          <div className={Styles.secRow}>
            <div>质检扣分日期：{reduceScoreDate?moment(reduceScoreDate).format('YYYY-MM-DD'):null}</div>
            <div>分维：{dimension}</div>
            <div>违规等级：{violationLevelName}（扣除学分{qualityValue}）</div>
          </div>
        </div>
        <div>
          <div className={`${Styles.secCol} ${Styles.secDesc}`}>
            <div>附件：{attUrl?<a href={`${STATIC_HOST}/${attUrl}`} >附件1</a>:null}</div>
          </div>
          <div className={`${Styles.secCol} ${Styles.secDesc}`}>
            <div>违规详情：</div>
            <div>{desc}</div>
          </div>
        </div>
      </section>
    );
  }
}
