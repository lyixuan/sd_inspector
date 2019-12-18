import React from 'react';
import stylefather from '../indexPage.less';
import xuefen from '@/assets/newIndex/xuefen@2x.png';
import gengduo from '@/assets/newIndex/gengduo@2x.png';
import zheng from '@/assets/newIndex/zheng@2x.png';
import fu from '@/assets/newIndex/fu@2x.png';
import Echarts from './Echart_WorkBentch';
import style from './style.less';
import { getOption } from './score_normal_option';

class Score extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabActive:1
    };
  }

  clickTab = (id) =>{
    this.setState({
      tabActive:id
    })
  };
  render() {
    const {tabActive} = this.state;
    const { WorkbenchScore,userType } = this.props;

    let typeName = '';
    if(userType==='group'||userType==='class'){
      typeName = '小组排名'
    }
    if(userType==='family'){
      typeName = '家族排名'
    }
    if(userType==='college'){
      typeName = '学院排名'
    }
    const options = getOption(1);
    return (
      <div className={stylefather.boxLeft}>
        <div className={stylefather.boxHeader}>
          <img src={xuefen} alt=""/>
          <span className={stylefather.headerTitle}>学分</span>
          <img src={gengduo} alt=""/>
        </div>
        {(userType==='group'||userType==='class'||userType==='family'||userType==='college')&&<div>
          <div className={style.ScoreLeft}>
            <div className={style.total}>
              <span>6</span><span>/39</span>
              <div>{typeName}</div>
            </div>
            <Echarts options={options} style={{ height: 190 }}/>
          </div>
          <div className={style.ScoreRight}>
            <div className={style.ScoreTab}>
              <span className={tabActive===1?`${style.ScoreTabItem} ${style.tabActive}`:style.ScoreTabItem} onClick={()=>this.clickTab(1)}>正面</span>
              <span className={tabActive===2?`${style.ScoreTabItem} ${style.tabActive}`:style.ScoreTabItem} onClick={()=>this.clickTab(2)}>负面</span>
            </div>
            <div className={style.ScoreContent}>
              <div className={style.dataItem}>
                {/*<div style={{color:'#3DD598'}}>56% <img width={16} src={zheng} alt=""/></div>*/}
                <div style={{color:'#FC5A5A'}}>56% <img width={16} src={fu} alt=""/></div>
                <div>-0.78</div>
                <div>工单</div>
              </div>
              <div className={style.dataItem}>
                <div style={{color:'#3DD598'}}>56% <img width={16} src={zheng} alt=""/></div>
                {/*<div style={{color:'#FC5A5A'}}>56% <img width={16} src={fu} alt=""/></div>*/}
                <div>-0.78</div>
                <div>工单</div>
              </div>
              <div className={style.dataItem}>
                {/*<div style={{color:'#3DD598'}}>56% <img width={16} src={zheng} alt=""/></div>*/}
                <div style={{color:'#FC5A5A'}}>56% <img width={16} src={fu} alt=""/></div>
                <div>-0.78</div>
                <div>工单</div>
              </div>
              <div className={style.dataItem}>
                {/*<div style={{color:'#3DD598'}}>56% <img width={16} src={zheng} alt=""/></div>*/}
                <div style={{color:'#FC5A5A'}}>56% <img width={16} src={fu} alt=""/></div>
                <div>-0.78</div>
                <div>工单</div>
              </div>
              <div className={style.dataItem}>
                {/*<div style={{color:'#3DD598'}}>56% <img width={16} src={zheng} alt=""/></div>*/}
                <div style={{color:'#FC5A5A'}}>56% <img width={16} src={fu} alt=""/></div>
                <div>-0.78</div>
                <div>工单</div>
              </div>
              <div className={style.dataItem}>
                {/*<div style={{color:'#3DD598'}}>56% <img width={16} src={zheng} alt=""/></div>*/}
                <div style={{color:'#FC5A5A'}}>56% <img width={16} src={fu} alt=""/></div>
                <div>-0.78</div>
                <div>工单</div>
              </div>
            </div>
          </div>
        </div>}
      </div>
    );
  }
}

export default Score;
