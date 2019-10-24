import React from 'react';
import { Icon, Divider, Row, Col, Tooltip } from 'antd';
import styles from './style.css';
import { thousandsFormat } from '@/utils/utils';
import avatarStudent from '@/assets/avatarStudent.png';
import face1 from '@/assets/face1.svg';
import face2 from '@/assets/face2.svg';

export default class BaseInfo extends React.Component {
  render() {
    const { imageUrl, stuName, nickName, sex, age, city, collegeName, familyName, groupName, businessName, registerDate, serviceEndDate } = this.props.baseInfo || {};
    const {
      learnInitiative = {},
      exerciseInitiative = {},
      consultCount = 0,
      negativeList = [],
      imNonRatio,
      exerciseRatio,
    } = this.props.tagInfo || {};

    return (
      <div className={styles.contentLayout}>
        <div className={styles.left}>
          <img className={styles.avatar} src={imageUrl || avatarStudent}/>
        </div>
        <div className={styles.right}>
          <div className={styles.name}>{stuName || nickName}</div>
          <div>
            <span className={styles.item}>{sex === '男' ? <Icon type="man" className={styles.sex}/> :
              <Icon type="woman" className={styles.sex}/>}</span>
            <span className={styles.item}>{age}岁</span>
            <span className={styles.item}>{city}</span>
            <span
              className={styles.item2}>{collegeName}{familyName && '/'}{familyName}{groupName && '/'}{groupName}</span>
            <span className={styles.item2}>{businessName}</span>
            <span className={styles.item2}>注册日期：{registerDate}</span>
            {/*<span className={styles.item2}>过服日期：{serviceEndDate}</span>*/}
          </div>
        </div>
        <Divider dashed/>
        <Row className={styles.row}>
          <Col span={3} className={styles.baseCol}>
            <Tooltip placement="top"
                     title={`最近一周观看重播${thousandsFormat(Math.ceil(learnInitiative.replayTime / 60))}分钟，查看直播${thousandsFormat(Math.ceil(learnInitiative.liveTime / 60))}分钟。`}>
              <div>图片</div>
              <div>学习主动性</div>
            </Tooltip>
          </Col>
          <Col span={1}>
            <Divider type="vertical" className={styles.vertical}/>
          </Col>
          <Col span={3} className={styles.baseCol}>
            <Tooltip placement="top" title={`最近一周共做题${thousandsFormat(exerciseInitiative.exerciseCount)}道。`}>
              <div>图片</div>
              <div>做题主动性</div>
            </Tooltip>
          </Col>
          <Col span={1}>
            <Divider type="vertical" className={styles.vertical}/>
          </Col>
          <Col span={3} className={styles.baseCol}>
            <Tooltip placement="top" title={`最近一周IM咨询总量${thousandsFormat(consultCount)}`}>
              <div className={styles.zxl}>{thousandsFormat(consultCount)}</div>
              <div>咨询量</div>
            </Tooltip>
          </Col>
          <Col span={1}>
            <Divider type="vertical" className={styles.vertical}/>
          </Col>
          <Col span={3} className={styles.baseCol}>
            {negativeList && negativeList.length>0?<Tooltip placement="top" title={()=>{
              return <div>
                  {negativeList[0]&&<div>{negativeList[0].countDate} {negativeList[0].count}个负面会话</div>}
                  {negativeList[1]&&<div>{negativeList[1].countDate} {negativeList[1].count}个负面会话</div>}
                  {negativeList[2]&&<div>{negativeList[2].countDate} {negativeList[2].count}个负面会话</div>}
                  {negativeList[3]&&<div>{negativeList[3].countDate} {negativeList[3].count}个负面会话</div>}
                  {negativeList[4]&&<div>${negativeList[4].countDate} ${negativeList[4].count}个负面会话</div>}
                  {negativeList[5]&&<div>${negativeList[5].countDate} ${negativeList[5].count}个负面会话</div>}
                  {negativeList[6]&&<div>${negativeList[6].countDate} ${negativeList[6].count}个负面会话</div>}
              </div>
            }}>
              <div>{negativeList && negativeList.length === 0 ? <img className={styles.qx} src={face1}/> :
                <img className={styles.qx} src={face2}/>}</div>
              <div>情绪状态</div>
            </Tooltip>:
              <div>
              <div>{negativeList && negativeList.length === 0 ? <img className={styles.qx} src={face1}/> :
              <img className={styles.qx} src={face2}/>}</div>
              <div>情绪状态</div>
              </div>
            }
          </Col>
          <Col span={1}>
            <Divider type="vertical" className={styles.vertical}/>
          </Col>
          <Col span={3} className={styles.baseCol}>
            <Tooltip placement="top" title={`最近一周IM会话“不满意”率。`}>
              <div style={{ color: '#1A1C1F' }}><span className={styles.im}>{(imNonRatio * 100).toFixed(2)}</span> %
              </div>
              <div>IM不满意率</div>
            </Tooltip>
          </Col>
          <Col span={1}>
            <Divider type="vertical" className={styles.vertical}/>
          </Col>
          <Col span={3} className={styles.baseCol}>
            <Tooltip placement="top" title={`该学员所有做题情况：做对题目/总做题数。`}>
            <div>
              <div style={{ color: '#1A1C1F' }}><span className={styles.zxl}>{(exerciseRatio * 100).toFixed(2)}</span> %
              </div>
              <div>做题准确率</div>
            </div>
            </Tooltip>
          </Col>
          <Col span={1}>
          </Col>
        </Row>
      </div>
    );
  }
}
