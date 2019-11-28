import React from 'react';
import { Icon, Divider, Row, Col, Tooltip } from 'antd';
import styles from './style.css';
import styles2 from './style2.less';
import { thousandsFormat } from '@/utils/utils';
import {COMPANY_IMG_HOST} from '@/utils/constants';
import avatarStudent from '@/assets/avatarStudent.png';
import face1 from '@/assets/face1.svg';
import face2 from '@/assets/face2.svg';
import p0 from '@/assets/behaviorPath/1.png';
import p1 from '@/assets/behaviorPath/2.png';
import p2 from '@/assets/behaviorPath/3.png';
import p3 from '@/assets/behaviorPath/4.png';
import p4 from '@/assets/behaviorPath/5.png';
import p5 from '@/assets/behaviorPath/6.png';
import p6 from '@/assets/behaviorPath/7.png';
import p7 from '@/assets/behaviorPath/8.png';
import { jumpRouter } from '@/pages/ko/utils/utils';

export default class BaseInfo extends React.Component {
  getPic = (dayCount)=>{
    switch(dayCount) {
      case 0:
        return p0;
        break;
      case 1:
        return p1;
        break;
      case 2:
        return p2;
        break;
      case 3:
        return p3;
        break;
      case 4:
        return p4;
        break;
      case 5:
        return p5;
        break;
      case 6:
        return p6;
        break;
      case 7:
        return p7;
        break;
      default:
        return p0;
    }
  };
  render() {
    const { imageUrl, stuName, nickName, sex, age, city, collegeName, familyName, groupName, businessName, registerDate,stuId,serviceEndDate } = this.props.baseInfo || {};
    const {
      learnInitiative = {},
      exerciseInitiative = {},
      consultCount = 0,
      negativeList = [],
      imNonRatio,
      exerciseRatio,
      examScore={},
    } = this.props.tagInfo || {};

    const exedayCount = this.getPic(exerciseInitiative.dayCount);
    const learndayCount = this.getPic(learnInitiative.dayCount);
    return (
      <div className={styles.contentLayoutbase}>
        <div className={styles.left}>
          <img className={styles.avatar} src={imageUrl?`${COMPANY_IMG_HOST}${imageUrl}`: avatarStudent}/>
        </div>
        <div className={styles.right}>
          <div className={styles.name}>{stuName || nickName}  {stuId?<span style={{marginLeft:15}}>ID: {stuId}</span>:null}</div>
          <div>
            <span className={styles.item}>{sex === '男' ? <Icon type="man" className={styles.sex}/> :
              <Icon type="woman" className={styles.sex}/>}</span>
            {age && <span className={styles.item}>{age}岁</span>}
            {city && <span className={styles.item}>{city}</span>}
            <span
              className={styles.item}>{collegeName}{familyName && '/'}{familyName}{groupName && '/'}{groupName}</span>
            {businessName&&<span className={styles.item}>{businessName}</span>}
            <span className={styles.item}>注册日期：{registerDate}</span>
            {/*<span className={styles.item2}>过服日期：{serviceEndDate}</span>*/}
          </div>
        </div>
        <Divider dashed/>
        <Row className="user-portary-row">
          <Col span={1}>
          </Col>
          <Col span={2} className={styles.baseCol} onClick={()=>jumpRouter(stuId,{target:'study'} )} >
            <Tooltip placement="top"
                     title={`最近一周观看重播${thousandsFormat(Math.ceil(learnInitiative.replayTime / 60))}分钟，查看直播${thousandsFormat(Math.ceil(learnInitiative.liveTime / 60))}分钟。`}>
              <div><img className={styles.baseImg} src={learndayCount}/></div>
              <div>学习主动性</div>
            </Tooltip>
          </Col>
          <Col span={1}>
            <Divider type="vertical" className={styles.vertical}/>
          </Col>
          <Col span={2} className={styles.baseCol}>
            <Tooltip placement="top" title={`最近一周共做题${thousandsFormat(exerciseInitiative.exerciseCount)}道。`}>
              <div><img className={styles.baseImg} src={exedayCount}/></div>
              <div>做题主动性</div>
            </Tooltip>
          </Col>
          <Col span={1}>
            <Divider type="vertical" className={styles.vertical}/>
          </Col>
          <Col span={2} className={styles.baseCol} onClick={()=>jumpRouter(stuId,{target:'im'} )}>
            <Tooltip placement="top" title={`最近一周IM咨询总量${thousandsFormat(consultCount)}`}>
              <div className={styles.zxl}>{thousandsFormat(consultCount)}</div>
              <div>咨询量</div>
            </Tooltip>
          </Col>
          <Col span={1}>
            <Divider type="vertical" className={styles.vertical}/>
          </Col>
          <Col span={2} className={styles.baseCol} onClick={()=>jumpRouter(stuId,{target:'im'} )}>
            <Tooltip placement="top" title={()=>{
              return <div>
                <div>AI识别该学员最近一周IM会话的情绪</div>
                  {negativeList[0]&&<div>{negativeList[0].countDate} {negativeList[0].count}个负面会话</div>}
                  {negativeList[1]&&<div>{negativeList[1].countDate} {negativeList[1].count}个负面会话</div>}
                  {negativeList[2]&&<div>{negativeList[2].countDate} {negativeList[2].count}个负面会话</div>}
                  {negativeList[3]&&<div>{negativeList[3].countDate} {negativeList[3].count}个负面会话</div>}
                  {negativeList[4]&&<div>${negativeList[4].countDate} {negativeList[4].count}个负面会话</div>}
                  {negativeList[5]&&<div>${negativeList[5].countDate} {negativeList[5].count}个负面会话</div>}
                  {negativeList[6]&&<div>${negativeList[6].countDate} {negativeList[6].count}个负面会话</div>}
              </div>
            }}>
              <div>{negativeList && negativeList.length === 0 ? <img className={styles.baseImg} src={face1}/> :
                <img className={styles.baseImg} src={face2}/>}</div>
              <div>情绪状态</div>
            </Tooltip>

          </Col>
          <Col span={1}>
            <Divider type="vertical" className={styles.vertical}/>
          </Col>
          <Col span={2} className={styles.baseCol} onClick={()=>jumpRouter(stuId,{target:'im'} )}>
            <Tooltip placement="top" title={`最近一周IM会话“不满意”率。`}>
              {imNonRatio!==null?<div style={{ color: '#1A1C1F' }}><span className={styles.im}>{(imNonRatio * 100).toFixed(2)}</span> %
              </div>:<div style={{ color: '#1A1C1F',height:45,lineHeight:3 }}>--</div>}
              <div>IM不满意率</div>
            </Tooltip>
          </Col>
          <Col span={1}>
            <Divider type="vertical" className={styles.vertical}/>
          </Col>
          <Col span={2} className={styles.baseCol}>
            <Tooltip placement="top" title={`该学员所有做题情况：做对题目/总做题数。`}>
            <div style={{cursor:'pointer'}}>
              {exerciseRatio!==null?<div style={{ color: '#1A1C1F' }}><span className={styles.zxl}>{(exerciseRatio * 100).toFixed(2)}</span> %
              </div>:<div style={{ color: '#1A1C1F',height:45,lineHeight:3 }}>--</div>}
              <div>做题准确率</div>
            </div>
            </Tooltip>
          </Col>
          <Col span={1}>
            <Divider type="vertical" className={styles.vertical}/>
          </Col>
          <Col span={2} className={styles.baseCol}>
            <Tooltip placement="top" title={`该学员考试通过率，总通过科目数/总考试科目数。`}>
              <div style={{cursor:'pointer'}}>
                <div style={{ color: '#1A1C1F' }}><span className={styles.zxl}>{examScore.passed||0}</span>/{examScore.total||0}
                </div>
                <div>通过科次</div>
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
