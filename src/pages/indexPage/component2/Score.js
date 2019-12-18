import React from 'react';
import stylefather from '../indexPage.less';
import xuefen from '@/assets/newIndex/xuefen@2x.png';
import gengduo from '@/assets/newIndex/gengduo@2x.png';
import zheng from '@/assets/newIndex/zheng@2x.png';
import fu from '@/assets/newIndex/fu@2x.png';
import Echarts from './Echart_WorkBentch';
import style from './style.less';
import { getNormalOption } from './score_normal_option';
import { getOptionBoss } from './score_boss_option';

class Score extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabActive: 1,
    };
  }

  clickTab = (id) => {
    this.setState({
      tabActive: id,
    });
  };

  render() {
    const { tabActive } = this.state;
    const { WorkbenchScore, userType } = this.props;
    const { familyType } = WorkbenchScore || {};
    let positive = [];
    let rank = {};
    let boss = [];

    let typeName = '';
    if (userType === 'group' || userType === 'class') {
      typeName = '小组排名';
    }
    if (userType === 'family') {
      typeName = '家族排名';
    }
    if (userType === 'college') {
      typeName = '学院排名';
    }

    if (userType === 'boss' && WorkbenchScore[familyType]) {
      boss = WorkbenchScore[familyType].boss;
    } else if (userType !== 'boss' && WorkbenchScore[familyType]) {
      positive = this.state.tabActive===1? WorkbenchScore[familyType].positive:WorkbenchScore[familyType].negative;
      rank = WorkbenchScore[familyType].rank;
    }
    const {rankList=[]}=rank||{};
    const normalOptions = getNormalOption(rankList);
    // const options2 = getOptionBoss(1);

    const normalContent =positive.map((item)=>{
      return (
        <div className={style.dataItem}>
          {item.qoqValue>0&&<div style={{color:'#3DD598'}}>{item.qoqValue===null?'N/A':(item.qoqValue*100).toFixed(0)+'%'} <img width={16} src={zheng} alt=""/></div>}
          {item.qoqValue<0&&<div style={{ color: '#FC5A5A' }}>{item.qoqValue===null?'N/A':(item.qoqValue*100).toFixed(0)+'%'} <img width={16} src={fu} alt=""/></div>}
          {(item.qoqValue===0||item.qoqValue===null)&&<div style={{ color: '#333' }}>{item.qoqValue===null?'N/A':(item.qoqValue*100).toFixed(0)+'%'}</div>}
          <div>{(item.score).toFixed(2)}</div>
          <div>{item.name}</div>
        </div>
      )
    });

    return (
      <div className={stylefather.boxLeft}>
        <div className={stylefather.boxHeader}>
          <img src={xuefen} alt=""/>
          <span className={stylefather.headerTitle}>学分</span>
          <img src={gengduo} alt=""/>
        </div>

        {(userType === 'group' || userType === 'class' || userType === 'family' || userType === 'college') && <div>
          <div className={style.ScoreLeft}>
            <div className={style.total}>
              <span>{rank.rankNum}</span><span>/{rank.total}</span>
              <div>{typeName}</div>
            </div>
            <Echarts options={normalOptions} style={{ height: 190 }}/>
          </div>
          <div className={style.ScoreRight}>
            <div className={style.ScoreTab}>
              <span className={tabActive === 1 ? `${style.ScoreTabItem} ${style.tabActive}` : style.ScoreTabItem}
                    onClick={() => this.clickTab(1)}>正面</span>
              <span className={tabActive === 2 ? `${style.ScoreTabItem} ${style.tabActive}` : style.ScoreTabItem}
                    onClick={() => this.clickTab(2)}>负面</span>
            </div>
            <div className={style.ScoreContent}>
              {normalContent}
            </div>
          </div>
        </div>}

        {userType === 'boss' && <div className={style.crossRow}>
          <Echarts options={normalOptions} style={{ height: 250, width: 265, float: 'left' }}/>
          <Echarts options={normalOptions} style={{ height: 250, width: 260, float: 'left' }}/>
        </div>}
      </div>
    );
  }
}

export default Score;
