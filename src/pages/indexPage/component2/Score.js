import React from 'react';
import stylefather from '../indexPage.less';
import xuefen from '@/assets/newIndex/xuefen@2x.png';
import gengduo from '@/assets/newIndex/gengduo@2x.png';
import zheng from '@/assets/newIndex/zheng@2x.png';
import fu from '@/assets/newIndex/fu@2x.png';
import gaiban from '@/assets/newIndex/gaiban@2x.png';
import Echarts from './Echart_WorkBentch';
import { jumpGobalRouter ,jumpGobalSelfRouter} from '@/pages/ko/utils/utils';
import style from './style.less';
import { getNormalOption } from './score_normal_option';
import { getOptionBoss } from './score_boss_option';
import BISelect from '@/ant_components/BISelect/index';
import moment from 'moment';
import { handleDataTrace } from '@/utils/utils';
const { Option } = BISelect;


class Score extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabActive: 2,
      type:0,
    };
  }

  clickTab = (id) => {
    this.setState({
      tabActive: id,
    });
  };

  onChangeApp = (type) =>{
    this.setState({
      type
    })
  };

  jump = (dementionId,name,barJump,bossFamilyType) => {
    const { userType ,WorkbenchScore,date } = this.props;
    const { familyType } = WorkbenchScore || {};
    let contrasts = 1;
    if (userType === 'group' || userType === 'class') {
      contrasts = 3;
    }
    if (userType === 'family') {
      contrasts = 2;
    }
    if (userType === 'college'||userType === 'boss') {
      contrasts = 1;
    }

    let familyTypeParam =  familyType ===3?Number(this.state.type):familyType===null?0:familyType;
    if(dementionId){
      const {tabActive} = this.state;
      handleDataTrace({"widgetName":`${tabActive===1?'学分正面':'学分负面'}${name}`,"traceName":`工作台2.0/本期学分${tabActive===1?'正面子维度':'负面子维度'}`});
      const params = {dementionId, startTime:moment(date.startDate).format('YYYY-MM-DD'), endTime:moment(date.endDate).format('YYYY-MM-DD'),familyType: familyTypeParam};
      jumpGobalRouter('xdCredit/index',  params )
    } else if(barJump){
      const bossList =WorkbenchScore[bossFamilyType].boss;
      const collegeId = bossList[barJump.dataIndex].collegeId;
      const params = {orgId:collegeId,startTime:moment(date.startDate).format('YYYY-MM-DD'), endTime:moment(date.endDate).format('YYYY-MM-DD'),familyType: String(bossFamilyType)};
      jumpGobalSelfRouter('xdCredit/index', params )
    } else {
      // 创收排名
      handleDataTrace({"widgetName":`本期学分`,"traceName":`工作台2.0/本期学分`});
      jumpGobalRouter('newDetail/histogram', {contrasts, dataRange: [moment(date.startDate).format('YYYY-MM-DD'), moment(date.endDate).format('YYYY-MM-DD')], familyType: familyTypeParam})
    }
  };

  render() {
    const { tabActive } = this.state;
    const { WorkbenchScore, userType } = this.props;
    const { familyType } = WorkbenchScore || {};
    let positive = [];
    let rank = {};
    let boss0 = [];
    let boss1 = [];

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

    if (userType === 'boss' && WorkbenchScore[0]&& WorkbenchScore[1]) {
      boss0=WorkbenchScore[0].boss;
      boss1 = WorkbenchScore[1].boss;
    } else if (userType !== 'boss' && familyType!==3 && WorkbenchScore[familyType]) {
      positive = this.state.tabActive===1? WorkbenchScore[familyType].positive:WorkbenchScore[familyType].negative;
      rank = WorkbenchScore[familyType].rank;
    } else if (userType !== 'boss' && familyType===3) {
      positive = this.state.tabActive===1? WorkbenchScore[this.state.type].positive:WorkbenchScore[this.state.type].negative;
      rank = WorkbenchScore[this.state.type].rank;
    }
    const {rankList=[]}=rank||{};
    const normalOptions = getNormalOption(rankList);
    const bossOptions1 = getOptionBoss(boss0);
    const bossOptions2 = getOptionBoss(boss1);

    const normalContent =positive.map((item,idx)=>{
      return (
        <div key={idx} className={style.dataItem} onClick={()=>this.jump(item.dimensionId,item.name)}>
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
          <img src={gengduo} alt="" onClick={()=>this.jump()}/>
          &nbsp;
          {familyType===3&&<BISelect style={{ width: '90px' }} value={String(this.state.type)} onChange={(val) => this.onChangeApp(val)}>
            <Option key={0}>
              自考
            </Option>
            <Option key={1}>
              壁垒
            </Option>
          </BISelect>
          }
        </div>
        <div className={style.ScoreLeft}>
          <img src={gaiban} width={166} height={132} alt=""/>
        </div>
        {/*{(userType === 'group' || userType === 'class' || userType === 'family' || userType === 'college') && <div>*/}
          {/*<div className={style.ScoreLeft}>*/}
            {/*<div className={style.total}>*/}
              {/*<span>{rank.rankNum}</span><span>/{rank.total}</span>*/}
              {/*<div>{typeName}</div>*/}
            {/*</div>*/}
            {/*<Echarts options={normalOptions} style={{ height: 180 }}/>*/}
          {/*</div>*/}
          {/*<div className={style.ScoreRight}>*/}
            {/*<div className={style.ScoreTab}>*/}
              {/*<span className={tabActive === 1 ? `${style.ScoreTabItem} ${style.tabActive}` : style.ScoreTabItem}*/}
                    {/*onClick={() => this.clickTab(1)}>正面</span>*/}
              {/*<span className={tabActive === 2 ? `${style.ScoreTabItem} ${style.tabActive}` : style.ScoreTabItem}*/}
                    {/*onClick={() => this.clickTab(2)}>负面</span>*/}
            {/*</div>*/}
            {/*<div className={style.ScoreContent}>*/}
              {/*{normalContent}*/}
            {/*</div>*/}
          {/*</div>*/}
        {/*</div>}*/}

        {/*{userType === 'boss' && <div className={style.crossRow}>*/}
          {/*<div className={style.bossName}>*/}
            {/*<span>自考</span>*/}
            {/*<span>壁垒</span>*/}
          {/*</div>*/}
          {/*<Echarts  options={bossOptions1} style={{ height: 250, width: 265, float: 'left' }} clickEvent={(item)=>this.jump(null,null,item,0)}/>*/}
          {/*<Echarts  options={bossOptions2} style={{ height: 250, width: 260, float: 'left' }} clickEvent={(item)=>this.jump(null,null,item,1)}/>*/}
        {/*</div>}*/}
      </div>
    );
  }
}

export default Score;
