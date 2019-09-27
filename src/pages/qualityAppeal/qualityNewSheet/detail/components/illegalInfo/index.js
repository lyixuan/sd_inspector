import React from 'react';
import moment from 'moment';
import DownLoad from '@/components/DownLoad';
import styles from './style.css';
import { STATIC_HOST, FAMILY_TYPE } from '@/utils/constants';
import { BiFilter } from '@/utils/utils';

export default class IllegalInfoComponent extends React.Component {
  render() {
    const { data, masterRole = '',masterQualityValue = '', masterMail = '',
      masterRole2 = '',masterQualityValue2 = '', masterMail2 = '',
      masterRole3 = '',masterQualityValue3 = '', masterMail3 = '',
      masterRole4 = '',masterQualityValue4 = '', masterMail4 = '' } = this.props;
    const { violationDate, familyType, qualityType, reduceScoreDate, dimension, violationLevelName, violationLevel,qualityValue, attUrl, desc, primaryAssortment, secondAssortment, thirdAssortment ,role} = data;
    const name = attUrl && attUrl.split('/')[3];
    // 是否显示学院类型
    const classShow = Number(qualityType) !== 1 && role !=='group' && role !=='class' && role !=='family';
    return (
      <section className={styles.personInfoCon}>
        <div className={styles.container}>
          <div className={styles.secRow}>
            <div>质检违规日期：{violationDate ? moment(violationDate).format('YYYY-MM-DD') : null}</div>
            {/*<div>质检类型：{Number(qualityType) === 1 ? '客诉质检' : '班主任质检'}</div>*/}
            <div>分维：{dimension}</div>
            <div>违规分类：{primaryAssortment}{secondAssortment ? `| ${secondAssortment}` : null}{thirdAssortment ? `| ${thirdAssortment}` : null}</div>
          </div>
          <div className={styles.secRow}>
            <div>质检扣分日期：{reduceScoreDate ? moment(reduceScoreDate).format('YYYY-MM-DD') : null}</div>
            {/* <div>违规等 级：{violationLevelName} {Number(qualityValue)!==0 ?Number(qualityType) !== 1 ? '（扣除学分' : '(扣除绩效':''}{Number(qualityValue)!==0 ?Number(qualityType) !== 1 ? qualityValue+')' : `${(qualityValue * 100).toFixed(2)}%)`:''}</div> */}
            <div>违规等级：{violationLevelName} {qualityValue}{qualityValue ? Number(qualityValue)===2 ? '分' : '元' :''}</div>
          </div>
        </div>
        <div className={styles.container2}>
          {
            // Number(qualityType) === 1 && (role === 'csleader' || role==='csofficer') && Number(violationLevel) === 2 ? (
              <>
                <div style={{marginBottom:10,width:'100%'}}>
                  <span>连带责任人处罚：{masterRole&&masterRole.split(',')[0]?BiFilter(`FRONT_ROLE_TYPE_LIST|id:${masterRole&&masterRole.split(',')[0]}`).name:'角色未填写'}</span>，
                  <span> {`${masterMail?masterMail:'--'}@sunlands.com`}</span>，
                  <span>{masterRole&&masterRole.split(',')[1]?BiFilter(`PUNISH_LIST|id:${masterRole&&masterRole.split(',')[1]}`).name:'处罚方式未填'}</span>：
                  <span> {masterQualityValue?masterQualityValue:'--'} {masterRole?Number(masterRole.split(',')[1])===Number(2)?'分':'元':''}</span>
                </div>
                <div style={{marginBottom:10,width:'100%'}}>
                  <span style={{marginLeft:112}}>{masterRole2&&masterRole2.split(',')[0]?BiFilter(`FRONT_ROLE_TYPE_LIST|id:${masterRole2&&masterRole2.split(',')[0]}`).name:'角色未填写'}</span>，
                  <span> {`${masterMail2?masterMail2:'--'}@sunlands.com`}</span>，
                  <span>{masterRole2&&masterRole2.split(',')[1].split(',')[1]?BiFilter(`PUNISH_LIST|id:${masterRole2&&masterRole2.split(',')[1]}`).name:'处罚方式未填'}</span>：
                  <span> {masterQualityValue2?masterQualityValue2:'--'} {masterRole?Number(masterRole.split(',')[1])===Number(2)?'分':'元':''}</span>
                </div>
                <div style={{marginBottom:10,width:'100%'}}>
                  <span style={{marginLeft:112}}>{masterRole3&&masterRole3.split(',')[0]?BiFilter(`FRONT_ROLE_TYPE_LIST|id:${masterRole3&&masterRole3.split(',')[0]}`).name:'角色未填写'}</span>，
                  <span> {`${masterMail3?masterMail3:'--'}@sunlands.com`}</span>，
                  <span>{masterRole3&&masterRole3.split(',')[1]?BiFilter(`PUNISH_LIST|id:${masterRole3&&masterRole3.split(',')[1]}`).name:'处罚方式未填'}</span>：
                  <span> {masterQualityValue3?masterQualityValue3:'--'} {masterRole?Number(masterRole.split(',')[1])===Number(2)?'分':'元':''}</span>
                </div>
                <div style={{marginBottom:10,width:'100%'}}>
                  <span style={{marginLeft:112}}>{masterRole4&&masterRole4.split(',')[0]?BiFilter(`FRONT_ROLE_TYPE_LIST|id:${masterRole4&&masterRole4.split(',')[0]}`).name:'角色未填写'}</span>，
                  <span> {`${masterMail4?masterMail4:'--'}@sunlands.com`}</span>，
                  <span>{masterRole4&&masterRole4.split(',')[1]?BiFilter(`PUNISH_LIST|id:${masterRole4&&masterRole4.split(',')[1]}`).name:'处罚方式未填'}</span>：
                  <span> {masterQualityValue4?masterQualityValue4:'--'} {masterRole?Number(masterRole.split(',')[1])===Number(2)?'分':'元':''}</span>
                </div>
              </>
            // ) : null
          }
        </div>

        <div>
          <div className={styles.container}>

              {classShow&& role !== 'others' && ( <div className={styles.secRow}><div>学院类型：{FAMILY_TYPE.find(item => item.id === familyType) ? FAMILY_TYPE.find(item => item.id === familyType).name : ''}</div></div>)}

            <div className={styles.secRow}>
              <div><span style={{float:'left'}}>附件：</span> {attUrl ? <DownLoad loadUrl={`${STATIC_HOST}/${attUrl}`} text={name} fileName={() => name} textClassName={styles.downCls} /> : null}</div>
            </div>
          </div>

          <div className={`${styles.secCol} ${styles.secDesc}`}>
            <div>违规详情：</div>
            <div>{desc}</div>
          </div>
        </div>
      </section >
    );
  }
}
