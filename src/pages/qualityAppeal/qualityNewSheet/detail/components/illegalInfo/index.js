import React from 'react';
import moment from 'moment';
import Styles from './style.css';
import { STATIC_HOST } from '@/utils/constants';

export default class IllegalInfoComponent extends React.Component {
  render() {
    const {data}= this.props;
    return (
      <section className={Styles.personInfoCon}>
        <div className={Styles.container}>
          <div className={Styles.secRow}>
            <div>质检违规日期：{data.violationDate?moment(data.violationDate).format('YYYY-MM-DD HH:mm:ss'):null}</div>
            <div>质检类型：{Number(data.qualityType) === 1 ? '客诉质检' : '班主任质检'}</div>
            <div>
              违规分类：{data.primaryAssortment}|{data.secondAssortment}|
              {data.thirdAssortment}
            </div>
          </div>
          <div className={Styles.secRow}>
            <div>质检扣分日期：{data.reduceScoreDate?moment(data.reduceScoreDate).format('YYYY-MM-DD HH:mm:ss'):null}</div>
            <div>分维：{data.dimension}</div>
            <div>违规等级：{data.violationLevelName}（扣除学分{data.qualityValue}）</div>
          </div>
        </div>
        <div>
          <div className={`${Styles.secCol} ${Styles.secDesc}`}>
            <div>附件：{data.attUrl?<a href={`${STATIC_HOST}/${data.attUrl}`} >附件1</a>:null}</div>
          </div>
          <div className={`${Styles.secCol} ${Styles.secDesc}`}>
            <div>违规详情：</div>
            <div>{data.desc}</div>
          </div>
        </div>
      </section>
    );
  }
}
