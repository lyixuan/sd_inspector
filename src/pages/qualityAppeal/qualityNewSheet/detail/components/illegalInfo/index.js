import React from 'react';
import moment from 'moment';
import DownLoad from '@/components/DownLoad';
import styles from './style.css';
import { STATIC_HOST, FAMILY_TYPE } from '@/utils/constants';

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
            <div>违规等级：{violationLevelName} {Number(qualityValue)!==0 ?Number(qualityType) !== 1 ? '（扣除学分' : '(扣除绩效':''}{Number(qualityValue)!==0 ?Number(qualityType) !== 1 ? qualityValue+')' : `${(qualityValue * 100).toFixed(2)}%)`:''}</div>
          </div>
        </div>
        <div className={styles.container2}>
          {
            Number(qualityType) === 1 && (role === 'csleader' || role==='csofficer') && Number(violationLevel) === 2 ? (
              <>
                {
                  (masterRole||masterMail||masterQualityValue||Number(masterQualityValue)===0)&&
                  <div style={{marginBottom:10,width:'100%'}}>
                    <span>连带责任人：角色：{masterRole}</span> |
                    <span> 邮箱：{`${masterMail}@sunlands.com`}</span> |
                    <span> 扣除绩效：{(masterQualityValue * 100).toFixed(2)}%</span>
                  </div>
                }
                {masterRole2&&
                <div style={{marginBottom:10,width:'100%'}}>
                  <span style={{marginLeft:85}}> 角色：{masterRole2}</span> |
                  <span> 邮箱：{`${masterMail2}@sunlands.com`}</span> |
                  <span> 扣除绩效：{(masterQualityValue2 * 100).toFixed(2)}%</span>
                </div>}
                {masterRole3&&
                <div style={{marginBottom:10,width:'100%'}}>
                  <span style={{marginLeft:85}}> 角色：{masterRole3}</span> |
                  <span> 邮箱：{`${masterMail3}@sunlands.com`}</span> |
                  <span> 扣除绩效：{(masterQualityValue3 * 100).toFixed(2)}%</span>
                </div>
                }
                {masterRole4&&
                <div style={{marginBottom:10,width:'100%'}}>
                  <span style={{marginLeft:85}}> 角色：{masterRole4}</span> |
                  <span> 邮箱：{`${masterMail4}@sunlands.com`}</span> |
                  <span> 扣除绩效：{(masterQualityValue4 * 100).toFixed(2)}%</span>
                </div>
                }
              </>
            ) : null
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
